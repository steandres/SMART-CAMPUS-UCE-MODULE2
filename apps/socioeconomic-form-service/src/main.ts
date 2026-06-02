import { NestFactory } from '@nestjs/core';
import { SocioeconomicFormServiceModule } from './socioeconomic-form-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(SocioeconomicFormServiceModule);

  // Configuración de la documentación de Swagger
  const config = new DocumentBuilder()
    .setTitle('Socioeconomic Form Service')
    .setDescription('Módulo de Bienestar Estudiantil - Fichas Socioeconómicas UCE')
    .setVersion('1.0')
    .addTag('Socioeconomic Forms')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Puerto asignado a tu microservicio
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Socioeconomic Form Service corriendo en: http://localhost:${port}`);
  console.log(`Documentación de Swagger disponible en: http://localhost:${port}/api/docs`);
}
bootstrap();