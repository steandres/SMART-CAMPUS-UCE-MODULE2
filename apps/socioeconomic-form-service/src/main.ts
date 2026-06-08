import { NestFactory } from '@nestjs/core';
import { SocioeconomicFormServiceModule } from './socioeconomic-form-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(SocioeconomicFormServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Socioeconomic Form Service')
    .setDescription('Student Welfare Module - UCE Socioeconomic Forms')
    .setVersion('1.0')
    .addTag('Socioeconomic Forms')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Socioeconomic Form Service running at: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();
