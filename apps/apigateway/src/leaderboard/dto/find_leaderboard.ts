import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindLeaderBoardDto {
  @ApiProperty({
    description: 'id of the leaderboard',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
