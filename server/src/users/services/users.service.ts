import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm'
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { CredentialsEntity } from '../entities/credential.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CredentialsEntity)
    private readonly credentialsRepository: Repository<CredentialsEntity>,
  ) {}
  async create(user: CreateUserDto) {
    try {
      const userFound = await this.userRepository.findOne({ where: { email: user.email } });
      if(userFound) {
        return userFound
      }

      const newUser = await this.userRepository.save({
        email: user.email,
        avatar: user.avatar,
        name: user.name,
      });


      const credentials = new CredentialsEntity();
      credentials.userID = newUser.id;
      credentials.providerID = user.providerID;
      credentials.providerKey = user.providerKey;
      await this.credentialsRepository.save(credentials);

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
