import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSuperDto {
  @ApiProperty({
    description: 'username',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'password',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
