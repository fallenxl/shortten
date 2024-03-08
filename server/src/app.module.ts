import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsModule } from './urls/urls.module';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { GithubStrategy } from './auth/strategies/github.strategy';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      
    }),
    UsersModule,
    AuthModule,
    UrlsModule,
  ],
  providers: [GoogleStrategy, GithubStrategy],
  controllers: [AppController],
})
export class AppModule {}
