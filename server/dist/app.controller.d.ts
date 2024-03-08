import { UrlsService } from './urls/services/urls.service';
import { Response } from 'express';
export declare class AppController {
    private readonly urlService;
    constructor(urlService: UrlsService);
    redirectToOriginalUrl(shortUrl: string, res: Response): Promise<{
        url: string;
    }>;
}
