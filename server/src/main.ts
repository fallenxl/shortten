import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4001;

  app.use(morgan('dev'));

  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    methods: "*",
    credentials: true,
    maxAge: 3600,
  
  })

  app.setGlobalPrefix('api', {
    exclude: ['/:shortUrl'],
  });
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
