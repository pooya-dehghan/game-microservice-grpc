import { PlayerLeftGameRequest } from '@app/common';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerLeftDto implements PlayerLeftGameRequest {
  @ApiProperty({
    description: 'gameID in which a player of this is going to be left',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  gameID: number;

  @ApiProperty({
    description: 'playerID which is going to be leave the game',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  playerID: number;
}
