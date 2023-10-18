import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaderBoardDto {
  @ApiProperty({
    description: 'name of the leaderboard',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'creator of the leaderboard id',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  creator: number;
}
