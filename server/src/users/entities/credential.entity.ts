import { BaseEntity } from 'src/config/base.entity';
import { ICredential, IUser } from 'src/interfaces';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'credentials' })
export class CredentialsEntity implements ICredential  {
  @PrimaryColumn({
    type: 'enum',
    enum: ['google', 'github'],
    name: 'provider_id',
  })
  providerID: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    name: 'provider_key',
  })
  providerKey: string;

  @OneToOne(() => UserEntity, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  userID: string;

}
