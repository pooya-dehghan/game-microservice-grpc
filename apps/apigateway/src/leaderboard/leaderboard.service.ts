<<<<<<< HEAD
import { Injectable } from '@nestjs/common';

@Injectable()
export class LeaderboardService {}
=======
import { Injectable, Inject } from '@nestjs/common';
import {
  LeaderBoardServiceClient,
  LEADER_BOARD_SERVICE_NAME,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateLeaderBoardDto, FindLeaderBoardDto } from './dto';

@Injectable()
export class LeaderboardService {
  private leaderBoardService: LeaderBoardServiceClient;

  constructor(@Inject('LEADERBOARD_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.leaderBoardService = this.client.getService<LeaderBoardServiceClient>(
      LEADER_BOARD_SERVICE_NAME,
    );
  }

  createLeaderBoard(payload: CreateLeaderBoardDto) {
    return this.leaderBoardService.createLeaderBoard(payload);
  }

  findLeaderBoard(payload: number) {
    return this.leaderBoardService.findOneLeaderBoard({
      leaderboardID: payload,
    });
  }
}
>>>>>>> develop
