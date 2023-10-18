import { ListAvailableGamesRequest } from '@app/common';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvailableGameDto implements ListAvailableGamesRequest {
  @ApiProperty({
    description: 'userID to show list of available games to',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  userID: number;
}
