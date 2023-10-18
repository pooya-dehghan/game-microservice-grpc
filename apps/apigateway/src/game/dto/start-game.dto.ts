import { StartGameRequest } from '@app/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartGameDto implements StartGameRequest {
  @ApiProperty({
    description: 'gameID of the game which is going to start',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @ApiProperty({
    description: 'creator id which is the admin of the game who can start game',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  creator: string;
}
