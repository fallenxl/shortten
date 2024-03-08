import { BaseEntity } from 'src/config/base.entity';
import { IUser } from 'src/interfaces';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { CredentialsEntity } from './credential.entity';
import { UrlEntity } from 'src/urls/entities/url.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  avatar: string;

  @Column({
    type: 'enum',
    enum: ['en', 'es'],
    default: 'en',
  })
  locale: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @OneToOne(() => CredentialsEntity, (user) => user.userID)
  credentials: string;

  @OneToMany(() => UrlEntity, (url) => url.userID)
  urls: [];
}
