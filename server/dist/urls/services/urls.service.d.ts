import { UrlEntity } from '../entities/url.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { CreateUrlDto } from '../dto/create-url.dto';
import { UpdateUrlDto } from '../dto/update-url.dto';
export declare class UrlsService {
    private readonly urlRepository;
    constructor(urlRepository: Repository<UrlEntity>);
    create(createUrlDto: CreateUrlDto, req: Request): Promise<{
        message: string;
        url: UrlEntity;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    updateURL(id: string, updateUrlDto: UpdateUrlDto): Promise<{
        message: string;
    }>;
    getURLsByUser(req: Request): Promise<UrlEntity[]>;
    getOriginalURL(shortURL: string, res: Response): Promise<UrlEntity>;
    incrementClicks(shortURL: string): Promise<{
        message: string;
    }>;
    hashURL(url: string): string;
}
