import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    try {
      const user = await this.authService.validateUserByGoogle(req);
      return user;
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
  async githubLoginCallback(@Req() req) {
    // Redirige o maneja la lógica después de la autenticación
   try {
    const user = await this.authService.validateUserByGithub(req);
    return user;
   } catch (error) {
      return {
        message: 'Error',
        error: error.message 
      };
   }
  }
}
