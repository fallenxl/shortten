import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-github';
import { AuthService } from '../services/auth.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,      
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    // Aquí puedes validar al usuario con tu base de datos o servicio de autenticación
    const user = {
        githubId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0].value
    }
    done(null, user);
  }
}