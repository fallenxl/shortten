import { BaseEntity } from 'src/config/base.entity';
import { IUser } from 'src/interfaces';
export declare class UserEntity extends BaseEntity implements IUser {
    name: string;
    avatar: string;
    locale: string;
    email: string;
    credentials: string;
    urls: [];
}
