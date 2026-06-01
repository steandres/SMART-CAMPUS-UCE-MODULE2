type EnvConfig = Record<string, string | undefined>;

const requiredVariables = [
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
];

export function validateEnv(config: EnvConfig): EnvConfig {
  for (const variable of requiredVariables) {
    if (!config[variable]) {
      throw new Error(`Environment variable ${variable} is required`);
    }
  }

  const dbPort = Number(config.DB_PORT);
  if (Number.isNaN(dbPort) || dbPort <= 0) {
    throw new Error('Environment variable DB_PORT must be a valid number');
  }

  return config;
}
