import { FindOneGameRequest } from '@app/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneDto implements FindOneGameRequest {
  @ApiProperty({
    description: 'id of the game to be found with',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
