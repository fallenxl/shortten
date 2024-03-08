import { BaseEntity } from 'src/config/base.entity';
import { IUrl } from 'src/interfaces';
import { UserEntity } from 'src/users/entities/user.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'urls' })
export class UrlEntity extends BaseEntity implements IUrl {
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
    type: 'int',
    nullable: false,
    default: 0,
  })
  @Check(`"clicks" >= 0`)
  clicks: number;

  @ManyToOne(() => UserEntity, (user) => user.urls, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id'})
  userID: string;
}
