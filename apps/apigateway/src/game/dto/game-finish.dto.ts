import { GameFinishResultsRequest } from '@app/common';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GameFinishDto implements GameFinishResultsRequest {
  @ApiProperty({
    description: 'gameID of the game which is going to be finished',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  gameID: number;
}
