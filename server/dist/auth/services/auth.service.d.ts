import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserByGoogle(req: any): Promise<any>;
    validateUserByGithub(req: any): Promise<any>;
}
