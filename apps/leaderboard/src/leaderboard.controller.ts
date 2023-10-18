import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderBoardServiceControllerMethods } from '@app/common';
import {
  FindOneLeaderBoardRequest,
  FindOneLeaderBoardResponse,
  CreateLeaderBoardRequest,
  CreateLeaderBoardResponse,
} from '@app/common';

@UseInterceptors()
@LeaderBoardServiceControllerMethods()
@Controller()
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  createLeaderBoard(request: CreateLeaderBoardRequest) {
    return this.leaderboardService.CreateLeaderBoard(request);
  }

  findOneLeaderBoard(request: FindOneLeaderBoardRequest) {
    return this.leaderboardService.FindLeaderBoard(request);
  }
}
