import { LoginReqeust } from '@app/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto implements LoginReqeust {
  @ApiProperty({
    description: 'username of the user to be loged in',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'password of the user to be loged in',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
