import { CreateUrlDto } from '../dto/create-url.dto';
import { UpdateUrlDto } from '../dto/update-url.dto';
import { UrlsService } from '../services/urls.service';
import { Request } from 'express';
export declare class UrlsController {
    private readonly urlService;
    constructor(urlService: UrlsService);
    create(createUrlDto: CreateUrlDto, req: Request): Promise<{
        message: string;
        url: import("src/urls/entities/url.entity").UrlEntity;
    }>;
    findAll(req: Request): Promise<import("src/urls/entities/url.entity").UrlEntity[]>;
    update(id: string, updateUrlDto: UpdateUrlDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
