import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RessetPasswordDto, SignUpDto } from './dto';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { ExceptionFilter } from '@app/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(GrpcToHttpInterceptor)
@UseFilters(new ExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  register(@Body() registerDto: SignUpDto) {
    return this.authService.signup(registerDto);
  }

  @Post('resset-password')
  resset_password(@Body() ressetPasswordDto: RessetPasswordDto) {
    return this.authService.resset_password(ressetPasswordDto);
  }
}
