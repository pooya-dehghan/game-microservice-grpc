import { Injectable } from '@nestjs/common';
import {
  GrpcNotFoundException,
  GrpcAlreadyExistsException,
  GrpcInvalidArgumentException,
} from 'nestjs-grpc-exceptions';
import { DatabaseService } from '../../../libs/common/src/database/database.service';
import {
  CreateGameRequest,
  CreateGameResponse,
  FindOneGameRequest,
  FindOneGameResponse,
  StartGameRequest,
  StartGameResponse,
  AddUserToGameRequest,
  AddUserToGameResponse,
  CollectPointRequest,
  CollectPointResponse,
  GameFinishResultsRequest,
  GameFinishResultsResponse,
  PlayerLeftGameRequest,
  PlayerLeftGameResponse,
  ListAvailableGamesRequest,
  ListAvailableGamesResponse,
} from '@app/common';

@Injectable()
export class GameService {
  constructor(private databaseService: DatabaseService) {}

  async CreateGame(payload: CreateGameRequest): Promise<any> {
    const creatorFound = await this.databaseService.user.findUnique({
      where: {
        id: payload.creator,
      },
    });
    if (!creatorFound) {
      throw new GrpcNotFoundException('there is no user with this id');
    }
    const createdGame = await this.databaseService.game.create({
      data: {
        ...payload,
      },
    });
    return createdGame;
  }

  async FindOneGame(payload: FindOneGameRequest): Promise<any> {
    const foundGame = await this.databaseService.game.findUnique({
      where: {
        id: +payload.id,
      },
    });
    if (!foundGame) {
      throw new GrpcNotFoundException('there is no game with this id');
    }
    return foundGame;
  }

  async StartGame(payload: StartGameRequest): Promise<StartGameResponse> {
    const creatorFound = await this.databaseService.user.findUnique({
      where: {
        id: +payload.creator,
      },
    });
    if (!creatorFound) {
      throw new GrpcNotFoundException('there is no user with this id');
    }
    const gameFound = await this.databaseService.game.findUnique({
      where: {
        id: +payload.gameId,
      },
    });
    if (!gameFound) {
      throw new GrpcNotFoundException('there is no game with this id');
    }
    const creatorId = gameFound.creator;
    if (creatorId != +payload.creator) {
      throw new GrpcNotFoundException(
        'creator id passed is not admin and creator of the game provided by id',
      );
    }
    const gameUpdated = await this.databaseService.game.update({
      where: {
        id: +payload.gameId,
      },
      data: {
        status: 'playing',
      },
    });
    return gameUpdated;
  }

  async addUserToGame(payload: AddUserToGameRequest): Promise<any> {
    const creatorFound = await this.databaseService.user.findUnique({
      where: {
        id: +payload.creatorId,
      },
    });
    if (!creatorFound) {
      throw new GrpcNotFoundException('there is no user with this id');
    }
    const memberFound = await this.databaseService.user.findUnique({
      where: {
        id: +payload.userToBeAdded,
      },
    });
    if (!memberFound) {
      throw new GrpcNotFoundException('there is no member with this id');
    }
    const gameFound = await this.databaseService.game.findUnique({
      where: {
        id: +payload.gameId,
      },
    });
    if (!gameFound) {
      throw new GrpcNotFoundException('there is no game with this id');
    }
    const scoreForPlayerCreated = await this.databaseService.score.create({
      data: {
        userId: memberFound.id,
        gameId: gameFound.id,
        score: 0,
      },
    });
    const gameUpdated = await this.databaseService.game.update({
      where: {
        id: +payload.gameId,
      },
      data: {
        members: {
          connect: {
            id: +payload.userToBeAdded,
          },
        },
        scores: {
          connect: {
            id: scoreForPlayerCreated.id,
          },
        },
      },
    });
    return gameUpdated;
  }

  async collectPoint(payload: CollectPointRequest) {
    const playerFound = await this.databaseService.user.findUnique({
      where: {
        id: payload.playerID,
      },
    });
    if (!playerFound) {
      throw new GrpcNotFoundException('there is no player with this id');
    }
    const gameFound = await this.databaseService.game.findUnique({
      where: {
        id: payload.gameID,
      },
      include: {
        members: true,
      },
    });
    if (!gameFound) {
      throw new GrpcNotFoundException('there is no game with this id');
    }
    if (gameFound.status !== 'playing') {
      throw new GrpcInvalidArgumentException(
        'game is not in play yet cannot do this action',
      );
    }
    const relatedScoreFound = await this.databaseService.score.updateMany({
      where: {
        userId: playerFound.id,
        gameId: gameFound.id,
      },
      data: {
        score: {
          increment: payload.pointCollected,
        },
      },
    });
    return gameFound;
  }

  async gameFinishResults(payload: GameFinishResultsRequest) {
    const gameFound = await this.databaseService.game.findUnique({
      where: {
        id: payload.gameID,
      },
    });
    if (!gameFound) {
      throw new GrpcNotFoundException('there is no game with this id');
    }
    const finishedGame = await this.databaseService.game.update({
      where: {
        id: payload.gameID,
      },
      data: {
        status: 'finished',
      },
    });
    const scoresOfThisGame = await this.databaseService.score.findMany({
      where: {
        gameId: finishedGame.id,
      },
    });
    if (scoresOfThisGame.length < 1) {
      throw new GrpcInvalidArgumentException(
        'this game has no attendance to see the result',
      );
    }
    let highestScore = scoresOfThisGame[0];
    scoresOfThisGame.forEach((score) => {
      if (highestScore.score < score.score) {
        highestScore = score;
      }
    });
    const winner = await this.databaseService.user.findUnique({
      where: {
        id: highestScore.userId,
      },
    });
    return {
      winnerID: highestScore.userId,
      winnerScore: highestScore.score,
      winnerName: winner.username,
    };
  }

  async playerLeftGame(payload: PlayerLeftGameRequest) {
    const memberFound = await this.databaseService.user.findUnique({
      where: {
        id: +payload.playerID,
      },
    });
    if (!memberFound) {
      throw new GrpcNotFoundException('there is no member with this id');
    }
    const gameFound = await this.databaseService.game.findUnique({
      where: {
        id: +payload.gameID,
      },
    });
    if (!gameFound) {
      throw new GrpcNotFoundException('there is no game with this id');
    }
    const relatedScoreFound = await this.databaseService.score.delete({
      where: {
        UniqueUserGameScore: {
          userId: memberFound.id,
          gameId: gameFound.id,
        },
      },
    });
    const gameUpdated = await this.databaseService.game.update({
      where: {
        id: gameFound.id,
      },
      data: {
        members: {
          connect: {
            id: payload.playerID,
          },
        },
        scores: {
          disconnect: {
            id: relatedScoreFound.id,
          },
        },
      },
    });
    return gameUpdated;
  }

  async listAvailableGames(payload: ListAvailableGamesRequest) {
    const availableGameToJoin = await this.databaseService.game.findMany({
      where: {
        status: 'pending',
      },
    });
    return availableGameToJoin;
  }
}
