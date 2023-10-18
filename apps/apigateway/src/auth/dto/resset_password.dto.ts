import { RessetPasswordRequest, AuthSuperDto } from '@app/common';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RessetPasswordDto
  extends AuthSuperDto
  implements RessetPasswordRequest
{
  @ApiProperty({
    description: 'newPassword to change password',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty({
    description: 'newPasswordRepeat to change password',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  newPasswordRepeat: string;
}
