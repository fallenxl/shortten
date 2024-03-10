import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Redirect } from '@nestjs/common';
import { CreateUrlDto } from '../dto/create-url.dto';
import { UpdateUrlDto } from '../dto/update-url.dto';
import { UrlsService } from '../services/urls.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { OptionalAuthGuard } from 'src/auth/guards';

@Controller('url')

export class UrlsController {
  constructor(private readonly urlService: UrlsService) {}

  @Post('create')
  @UseGuards(OptionalAuthGuard)
  create(@Body() createUrlDto: CreateUrlDto, @Req() req: Request){
    return this.urlService.create(createUrlDto, req);
  }
  
  @Get('all')
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    return this.urlService.getURLsByUser(req);
  }
  @Patch('update/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.updateURL(id, updateUrlDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.urlService.remove(id);
  }
}
