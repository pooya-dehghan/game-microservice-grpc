import {
  CreateLeaderBoardRequest,
  FindOneLeaderBoardRequest,
} from '@app/common';
import {
  GrpcNotFoundException,
  GrpcAlreadyExistsException,
} from 'nestjs-grpc-exceptions';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../libs/common/src/database/database.service';

@Injectable()
export class LeaderboardService {
  constructor(private databaseService: DatabaseService) {}

  async CreateLeaderBoard(payload: CreateLeaderBoardRequest) {
    const foundLeaderBoard = await this.databaseService.leaderBoard.findUnique({
      where: {
        name: payload.name,
      },
    });
    if (foundLeaderBoard) {
      throw new GrpcAlreadyExistsException(
        'a leaderboard with this name already exists please try with another name',
      );
    }
    const players = await this.databaseService.user.findMany();
    const createLeaderBoard = await this.databaseService.leaderBoard.create({
      data: {
        ...payload,
        Players: {
          connect: players.map((player) => ({
            id: player.id,
          })),
        },
      },
    });
    return createLeaderBoard;
  }

  async FindLeaderBoard(payload: FindOneLeaderBoardRequest) {
    const foundLeaderBoard = await this.databaseService.leaderBoard.findUnique({
      where: {
        id: payload.leaderboardID,
      },
    });
    if (!foundLeaderBoard) {
      throw new GrpcNotFoundException(
        'leader board with this id has not found',
      );
    }
    return foundLeaderBoard;
  }
}
