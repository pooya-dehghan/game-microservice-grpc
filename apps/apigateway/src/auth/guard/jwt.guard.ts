import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.extractToken(context);

    if (!token) throw new UnauthorizedException('invalid token');

    try {
      const user = this.jwtService.verify(token);
      this.attachPayload(context, user);
    } catch {
      throw new UnauthorizedException('invalid token');
    }

    return true;
  }
  private attachPayload(context: ExecutionContext, payload: any) {
    context.switchToHttp().getRequest().user = payload;
  }

  private extractToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return this.extractTokenFromHeader(request);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
