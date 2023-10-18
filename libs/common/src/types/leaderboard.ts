/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackageLeaderBoard = 'leaderboard';

export interface CreateLeaderBoardRequest {
  name: string;
  creator: number;
}

export interface CreateLeaderBoardResponse {
  name: string;
  players: Players | undefined;
}

export interface FindOneLeaderBoardRequest {
  leaderboardID: number;
}

export interface FindOneLeaderBoardResponse {
  name: string;
  players: Players | undefined;
  leaderBoardID: number;
}

export interface Player {
  username: string;
  playerID: number;
  score: number;
}

export interface Players {
  users: Player[];
}

export const LEADERBOARD_PACKAGE_NAME = 'leaderboard';

export interface LeaderBoardServiceClient {
  createLeaderBoard(
    request: CreateLeaderBoardRequest,
  ): Observable<CreateLeaderBoardResponse>;

  findOneLeaderBoard(
    request: FindOneLeaderBoardRequest,
  ): Observable<FindOneLeaderBoardResponse>;
}

export interface LeaderBoardServiceController {
  createLeaderBoard(
    request: CreateLeaderBoardRequest,
  ):
    | Promise<CreateLeaderBoardResponse>
    | Observable<CreateLeaderBoardResponse>
    | CreateLeaderBoardResponse;

  findOneLeaderBoard(
    request: FindOneLeaderBoardRequest,
  ):
    | Promise<FindOneLeaderBoardResponse>
    | Observable<FindOneLeaderBoardResponse>
    | FindOneLeaderBoardResponse;
}

export function LeaderBoardServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createLeaderBoard', 'findOneLeaderBoard'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('LeaderBoardService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('LeaderBoardService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const LEADER_BOARD_SERVICE_NAME = 'LeaderBoardService';
