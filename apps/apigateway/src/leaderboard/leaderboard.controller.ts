<<<<<<< HEAD
import { Controller } from '@nestjs/common';

@Controller('leaderboard')
export class LeaderboardController {}
=======
import {
  Controller,
  UseInterceptors,
  UseFilters,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { CreateLeaderBoardDto, FindLeaderBoardDto } from './dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  async createLeaderBoard(@Body() payload: CreateLeaderBoardDto) {
    return this.leaderboardService.createLeaderBoard(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Get('/:leaderboardID')
  async finOneLeaderBoard(
    @Param('leaderboardID', ParseIntPipe) payload: number,
  ) {
    return this.leaderboardService.findLeaderBoard(payload);
  }
}
>>>>>>> develop
