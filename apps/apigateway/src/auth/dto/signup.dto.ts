import { SignUpRequest } from '@app/common';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto implements SignUpRequest {
  @ApiProperty({
    description: 'username of the user to signup',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'password of the user to signup',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
