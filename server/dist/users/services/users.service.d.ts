import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { CredentialsEntity } from '../entities/credential.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly credentialsRepository;
    constructor(userRepository: Repository<UserEntity>, credentialsRepository: Repository<CredentialsEntity>);
    create(user: CreateUserDto): Promise<UserEntity>;
}
