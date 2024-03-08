import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { UrlsService } from './urls/services/urls.service';
import { Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly urlService: UrlsService) {}

  @Get(':shortUrl')
  @Redirect('', 302)
  async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response){
    const url = await this.urlService.getOriginalURL(shortUrl, res);
    return { url: url.originalURL };
  }
}
