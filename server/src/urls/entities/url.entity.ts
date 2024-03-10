import { BaseEntity } from 'src/config/base.entity';
import { IUrl } from 'src/interfaces';
import { UserEntity } from 'src/users/entities/user.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'urls' })
export class UrlEntity extends BaseEntity implements IUrl {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  tag: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'original_url',
  })
  @Check(`"original_url" ~* '^https?://.*$'`)
  originalURL: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'short_url',
  })
  shortURL: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'slug',
  })
  slug: string;
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  @Check(`"clicks" >= 0`)
  clicks: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'expires_at',
    default: null,
  })
  expiresAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.urls, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  userID: string;
}
