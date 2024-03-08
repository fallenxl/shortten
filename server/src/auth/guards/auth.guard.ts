import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt'; // Importa el servicio JWT para trabajar con tokens
  import { Request } from 'express'; // Importa el objeto de solicitud de Express
  import * as dotenv from 'dotenv'; // Importa la librería dotenv para cargar variables de entorno
  
  dotenv.config(); // Carga las variables de entorno desde el archivo .env
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    // Método canActivate que se ejecuta antes de las rutas protegidas
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest(); // Obtiene la solicitud HTTP
      const token = this.extractTokenFromHeader(request); // Extrae el token del encabezado
  
      if (!token) {
        throw new UnauthorizedException(); // Lanza una excepción si no se proporciona un token
      }
  
      try {
        // Verifica y decodifica el token utilizando el servicio JWT y la clave secreta
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET, // Utiliza la clave secreta desde las variables de entorno
        });
        request.sub = payload.sub; // Almacena la información del usuario autenticado en la solicitud
      } catch {
        throw new UnauthorizedException(); // Lanza una excepción si el token no es válido o expiró
      }
  
      return true; // Permite el acceso a la ruta protegida si la autenticación es exitosa
    }
  
    // Método privado para extraer el token del encabezado de autorización
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined; // Devuelve el token si es del tipo 'Bearer', de lo contrario, undefined
    }
  }