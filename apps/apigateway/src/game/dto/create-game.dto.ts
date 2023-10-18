import { CreateGameRequest } from '@app/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGametDto implements CreateGameRequest {
  @ApiProperty({
    description: 'creator which is id to create game',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  creator: number;

  @ApiProperty({
    description: 'max members which is maximum number of the users of the game',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  maxMembers: number;

  @ApiProperty({
    description: 'name of the game',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'status of the game which initialy is going to be pending',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
