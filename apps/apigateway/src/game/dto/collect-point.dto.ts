import { CollectPointRequest } from '@app/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CollectPointDto implements CollectPointRequest {
  @ApiProperty({
    description: 'playerID for attaching points to the game player',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  playerID: number;

  @ApiProperty({
    description: 'gameID of the game which point is attaching into',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  gameID: number;

  @ApiProperty({
    description: 'number of points from 0 to above to be attached to player',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  pointCollected: number;
}
