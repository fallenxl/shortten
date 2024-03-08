import { BaseEntity } from 'src/config/base.entity';
import { IUrl } from 'src/interfaces';
export declare class UrlEntity extends BaseEntity implements IUrl {
    originalURL: string;
    shortURL: string;
    clicks: number;
    userID: string;
}
