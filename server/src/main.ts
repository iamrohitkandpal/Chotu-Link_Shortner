import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // A Global Validation Pip - DTOs mein likhi validations apply hongi
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Extra fields remove ho jaeyegi
    forbidNonWhitelisted: true, // --> Extra fields ke liye error throw karenge
    transform: true, // --> Auto convserion of fields DTO waali fields me
  }))

  // CORS enable kar rahe hai same jaise express me karte hai
  app.enableCors()

  let PORT = process.env.PORT ?? 3333;
  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL Playground: http://localhost:${PORT}/graphql`);
}

bootstrap();
