import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any): Promise<any>;
    githubLogin(): Promise<void>;
    githubLoginCallback(req: any): Promise<any>;
}
