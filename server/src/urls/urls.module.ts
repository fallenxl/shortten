import { Module } from '@nestjs/common';
import { UrlsController } from './controllers/urls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { UrlsService } from './services/urls.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([UrlEntity]),JwtModule],
  controllers: [UrlsController],
  providers: [UrlsService],
  exports: [UrlsService]
})
export class UrlsModule {}
