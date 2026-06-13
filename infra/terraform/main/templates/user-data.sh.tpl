#!/bin/bash
set -euo pipefail

# ------------------------------------------------------------------------------
# User data para la instancia EC2 de microservicios SMART CAMPUS UCE
# ------------------------------------------------------------------------------

exec > >(tee /var/log/user-data.log) 2>&1

echo "[user-data] Iniciando configuracion de la instancia..."

# Detectar IP publica (Elastic IP o IP publica asignada)
PUBLIC_IP=$(curl -s -m 5 http://169.254.169.254/latest/meta-data/public-ipv4 || echo "")
if [ -z "$PUBLIC_IP" ]; then
  echo "[user-data] ERROR: No se pudo obtener la IP publica de la instancia"
  exit 1
fi
echo "[user-data] IP publica detectada: $PUBLIC_IP"

# Instalar Docker y Docker Compose (Amazon Linux 2023)
echo "[user-data] Instalando Docker..."
dnf update -y
dnf install -y docker docker-compose-plugin git

systemctl enable docker
systemctl start docker
usermod -aG docker ec2-user || true

# Crear directorio de despliegue
DEPLOY_DIR="/opt/${project_name}"
mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

# Clonar repositorio
echo "[user-data] Clonando repositorio ${github_repo_url} (rama: ${github_branch})..."
if [ -d "$DEPLOY_DIR/.git" ]; then
  git fetch origin
  git checkout ${github_branch}
  git pull origin ${github_branch}
else
  git clone -b ${github_branch} ${github_repo_url} .
fi

# Crear archivos .env.docker para cada microservicio
echo "[user-data] Creando archivos de configuracion .env.docker..."

cat > apps/scholarship-service/.env.docker <<EOF
NODE_ENV=production
PORT=3000
CORS_ORIGIN=*
AUTH_ENABLED=false
JWT_SECRET=change-me-in-production
JWT_ISSUER=smart-campus-uce
JWT_AUDIENCE=scholarship-service
DB_ENABLED=true
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=scholarship_db
DB_SYNCHRONIZE=true
DB_LOGGING=false
EOF

cat > apps/socioeconomic-form-service/.env.docker <<EOF
NODE_ENV=production
PORT=3001
CORS_ORIGIN=*
MONGO_ENABLED=true
MONGODB_URI=mongodb://mongo:27017/socioeconomic_forms
EOF

cat > apps/psychological-care-service/.env.docker <<EOF
NODE_ENV=production
PORT=3002
CORS_ORIGIN=*
AUTH_ENABLED=false
JWT_SECRET=change-me-in-production
JWT_ISSUER=smart-campus-uce
JWT_AUDIENCE=psychological-care-service
DB_ENABLED=true
DB_HOST=psychological-postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=psychological_care_db
DB_SYNCHRONIZE=true
DB_LOGGING=false
EOF

cat > apps/welfare-frontend/.env.docker <<EOF
NEXT_PUBLIC_SCHOLARSHIP_API_URL=http://$PUBLIC_IP:3000
NEXT_PUBLIC_SOCIOECONOMIC_API_URL=http://$PUBLIC_IP:3001
NEXT_PUBLIC_PSYCHOLOGICAL_API_URL=http://$PUBLIC_IP:3002
EOF

# Crear override de docker-compose para produccion con la IP publica
cat > docker-compose.prod.yml <<EOF
services:
  welfare-frontend:
    build:
      args:
        NEXT_PUBLIC_SCHOLARSHIP_API_URL: http://$PUBLIC_IP:3000
        NEXT_PUBLIC_SOCIOECONOMIC_API_URL: http://$PUBLIC_IP:3001
        NEXT_PUBLIC_PSYCHOLOGICAL_API_URL: http://$PUBLIC_IP:3002
EOF

# Construir e iniciar servicios
echo "[user-data] Construyendo e iniciando microservicios con Docker Compose..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml pull || true
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

echo "[user-data] Configuracion finalizada. Servicios disponibles en http://$PUBLIC_IP"
