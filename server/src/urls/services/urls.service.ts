import {
  Injectable,
  Req,
  Res,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from '../entities/url.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { createHash } from 'crypto';
import { CreateUrlDto } from '../dto/create-url.dto';
import { ErrorManager } from 'src/utilities/error.manager';
import { UpdateUrlDto } from '../dto/update-url.dto';

@Injectable({ scope: Scope.REQUEST })
export class UrlsService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}
  async create(createUrlDto: CreateUrlDto, @Req() req: Request){
    try {
      if (createUrlDto.shortURL) {
        const urlFound = await this.urlRepository.findOne({
          where: { shortURL: createUrlDto.shortURL },
        });
        if (urlFound) {
          throw new ErrorManager({
            type: 'CONFLICT',
            message: 'Short URL already exists',
          });
        }
      }

      const url = new UrlEntity();
      url.originalURL = createUrlDto.originalURL;
      url.shortURL =
        createUrlDto.shortURL ?? this.hashURL(createUrlDto.originalURL);
      url.userID = req.sub;
      console.log(req.user);
      await this.urlRepository.save(url);
      return {
        message: 'URL created',
        url,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  
  async remove(id: string) {
    try {
      const url = await this.urlRepository.findOne({ where: { id } });
      if (!url) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'URL not found',
        })
      }
      await this.urlRepository.remove(url);
      return {
        message: 'URL deleted',
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async updateURL(id: string, updateUrlDto: UpdateUrlDto) {
    try {
      const url = await this.urlRepository.findOne({ where: { id } });
      if (!url) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'URL not found',
        })
      }
      url.originalURL = updateUrlDto.originalURL;
      url.shortURL = updateUrlDto.shortURL;
      await this.urlRepository.save(url);
      return {
        message: 'URL updated',
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async getURLsByUser(@Req() req: Request) {
    try {
      console.log(req.sub);
      const urls = await this.urlRepository.createQueryBuilder('url').select([
        'url.id',
        'url.originalURL',
        'url.shortURL',
        'url.clicks',
      ]).where('url.userID = :userID', { userID: req.sub }).getMany();
      return urls;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async getOriginalURL(shortURL: string, @Res() res: Response) {
    try {
      const url = await this.urlRepository.findOne({ where: { shortURL } });
      if (!url) {
       res.redirect(process.env.FRONTEND_URL);
       throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'URL not found',
       })
      }
      await this.incrementClicks(shortURL);
      return url;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async incrementClicks(shortURL: string) {
    try {
      const url = await this.urlRepository.findOne({ where: { shortURL } });
      url.clicks += 1;
      await this.urlRepository.save(url);
      return {
        message: 'URL clicks incremented',
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  
  hashURL(url: string) {
    const randomComponent = Math.random().toString(36).substring(2, 8);
    const hash = createHash('md5');
    hash.update(url + randomComponent);
    return hash.digest('hex').substring(0, 8);
  }
}
