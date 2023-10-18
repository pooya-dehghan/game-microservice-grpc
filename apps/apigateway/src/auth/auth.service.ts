import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LoginDto, SignUpDto, RessetPasswordDto } from './dto';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  signup(registerDto: SignUpDto) {
    return this.authService.signUp(registerDto);
  }

  resset_password(ressetPasswordDto: RessetPasswordDto) {
    return this.authService.ressetPassword(ressetPasswordDto);
  }

  isUserAdmin(userID: number, gameID: number) {
    return this.authService.isUserAdmin({ userID, gameID });
  }
}
