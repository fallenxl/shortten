import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuard as AuthGuardJwt } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { ErrorManager } from 'src/utilities/error.manager';
import { UsersService } from 'src/users/services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  async getProfile(@Req() req) {
    try {
      const user = await this.userService.findOne(req.sub);
      if (!user) {
        throw new ErrorManager({
          message: 'User not found',
          type: 'BAD_REQUEST',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Res() res: Response) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const user = await this.authService.validateUserByGoogle(req);
      return res
        .status(200)
        .cookie('data.token', user.access_token, {
          httpOnly: true,
          domain: 'vercel.app',
        })
        .json(user)
        .redirect(process.env.FRONTEND_URL);
    } catch (error) {
      return {
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req, @Res() res: Response) {
    // Redirige o maneja la lógica después de la autenticación
    try {
      const user = await this.authService.validateUserByGithub(req);
      return res
      .status(200)
      .cookie('data.token', user.access_token, {
        httpOnly: true,
        domain: 'vercel.app',
      })
      .json(user)
      .redirect(process.env.FRONTEND_URL);
    } catch (error) {
      return {
        message: 'Error',
        error: error.message,
      };
    }
  }
}
