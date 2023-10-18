import { Controller, Get, UseInterceptors, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import {} from '@app/common';
import {
  AuthServiceControllerMethods,
  SignUpRequest,
  SignUpResponse,
  LoginReqeust,
  LoginResponse,
  RessetPasswordRequest,
  RessetPasswordResponse,
} from '@app/common';

@UseInterceptors()
@AuthServiceControllerMethods()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login(request: LoginReqeust): Promise<LoginResponse> {
    return this.authService.login(request);
  }

  signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return this.authService.signUp(request);
  }

  ressetPassword(
    request: RessetPasswordRequest,
  ): Promise<RessetPasswordResponse> {
    return this.authService.ressetPassword(request);
  }

  verify(request: any) {}
}
