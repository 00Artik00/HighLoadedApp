/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import mongoose from 'mongoose';
// import { MongoClient } from 'mongodb';
// MongoClient.connect('mongodb://localhost:27017')



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = process.env.PORT || 3001;
  console.log('ENV', environment);
  await app.listen(port);
}

bootstrap();
mongoose.connect('mongodb://127.0.0.1:27017/news-data');
