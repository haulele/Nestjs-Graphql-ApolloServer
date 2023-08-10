import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as express from 'express';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static('uploads'));
  app.use(
    '/graphql',
    graphqlUploadExpress({
      maxFileSize: process.env.MAX_FILE_SIZE,
      maxFiles: process.env.MAX_FILES }), 
  );
  const port = process.env.PORT || 3000;
  await app.listen(port); 
}
bootstrap();
