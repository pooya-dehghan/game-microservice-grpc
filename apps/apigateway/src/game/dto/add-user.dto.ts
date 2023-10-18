import { AddUserToGameRequest } from '@app/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto implements AddUserToGameRequest {
  @ApiProperty({
    description:
      'userToBeAdded is id of the user which is going to be a player in game',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  userToBeAdded: number;

  @ApiProperty({
    description:
      'gameId is id of the game which player is going to be added into',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @ApiProperty({
    description:
      'creatorId is the id of the admin and creator of the game which user is going to be added into',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  creatorId: number;
}
