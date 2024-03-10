import { Injectable, Req, Res, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from '../entities/url.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { createHash } from 'crypto';
import { CreateUrlDto } from '../dto/create-url.dto';
import { ErrorManager } from 'src/utilities/error.manager';
import { UpdateUrlDto } from '../dto/update-url.dto';
import * as dotenv from 'dotenv';
import { isNotEmptyString } from 'src/utilities';
dotenv.config();

@Injectable({ scope: Scope.REQUEST })
export class UrlsService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}
  async create(createUrlDto: CreateUrlDto, @Req() req: Request) {
    try {
      if (createUrlDto.slug) {
        const urlFound = await this.urlRepository.findOne({
          where: { slug: createUrlDto.slug },
        });
        if (urlFound) {
          throw new ErrorManager({
            type: 'CONFLICT',
            message: 'Slug already taken',
          });
        }
      }
;

      const url = new UrlEntity();
      url.originalURL = createUrlDto.originalURL;
      url.slug = isNotEmptyString(createUrlDto.slug) ? createUrlDto.slug : this.hashURL(createUrlDto.originalURL);
      url.shortURL = `${process.env.FRONTEND_URL}/${url.slug}`;
      url.userID = req.sub ?? null;
      url.expiresAt = req.sub
        ? null
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // expires in 7 days if user is not logged in
      await this.urlRepository.save(url);
      return {
        id: url.id,
        userID: url.userID,
        originalURL: url.originalURL,
        shortURL: url.shortURL,
        expiresAt: url.expiresAt,
        click: req.sub ? url.clicks : null,
        createdAt: url.createdAt,
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
        });
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
        });
      }
      url.originalURL = updateUrlDto.originalURL;
      url.slug = updateUrlDto.slug ?? this.hashURL(updateUrlDto.originalURL);
      url.shortURL = `${process.env.BACKEND_URL}/${url.slug}`;
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
      const urls = await this.urlRepository
        .createQueryBuilder('url')
        .select(['url.id', 'url.originalURL', 'url.shortURL', 'url.clicks'])
        .where('url.userID = :userID', { userID: req.sub })
        .orderBy('url.createdAt', 'DESC')
        .getMany();
      return urls;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async getOriginalURL(slug: string, @Res() res: Response) {
    try {
      const url = await this.urlRepository.findOne({ where: { slug: slug } });
      if (!url) {
        res.redirect(process.env.FRONTEND_URL);
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'URL not found',
        });
      }
      await this.incrementClicks(slug);
      return url;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async incrementClicks(slug: string) {
    try {
      const url = await this.urlRepository.findOne({ where: { slug } });
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
