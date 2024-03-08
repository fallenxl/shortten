import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUserByGoogle(@Req() req): Promise<any> {
    try {
      const payload = {
        email: req.user.email,
        avatar: req.user.photo,
        name: req.user.name,
        providerID: 'google',
        providerKey: req.user.googleId,
      };

      const user = await this.usersService.create(payload);

      // expires in 1 year
      const token = this.jwtService.sign(
        { sub: user.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '365d',
        },
      );

      return {
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        access_token: token,
      };
    } catch (error) {
      return {
        message: 'Error',
        error: error.message,
      };
    }
  }

  async validateUserByGithub(@Req() req): Promise<any> {
    try {
      const payload = {
        email: req.user.email,
        avatar: req.user.photo,
        name: req.user.name,
        providerID: 'github',
        providerKey: req.user.githubId,
      };

      if(!payload.email) {
        throw new HttpException('Email is required, please check your Github account settings', HttpStatus.BAD_REQUEST);
      }
      
      const user = await this.usersService.create(payload);

      // expires in 1 year
      const token = this.jwtService.sign(
        { sub: user.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '365d',
        },
      );

      return {
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        access_token: token,
      };
    } catch (error) {
      return {
        message: 'Error',
        error: error.message,
      };
    }
  }
}
