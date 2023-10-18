import { Injectable, Inject } from '@nestjs/common';
import { GameServiceClient, GAME_SERVICE_NAME } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateGametDto,
  FindOneDto,
  StartGameDto,
  AddUserDto,
  CollectPointDto,
  GameFinishDto,
  PlayerLeftDto,
  AvailableGameDto,
} from './dto';

@Injectable()
export class GameService {
  private gameService: GameServiceClient;

  constructor(@Inject('GAME_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.gameService =
      this.client.getService<GameServiceClient>(GAME_SERVICE_NAME);
  }

  createGame(payload: CreateGametDto) {
    return this.gameService.createGame(payload);
  }

  findOneGame(payload: number) {
    return this.gameService.findOneGame({ id: payload.toString() });
  }

  startGame(payload: StartGameDto) {
    return this.gameService.startGame(payload);
  }

  addUserToGame(payload: AddUserDto) {
    return this.gameService.addUserToGame(payload);
  }

  collectPoint(payload: CollectPointDto) {
    return this.gameService.collectPoint(payload);
  }

  gameFinishResults(payload: GameFinishDto) {
    console.log('payload of gameFinishResults: ', payload)
    return this.gameService.gameFinishResults(payload);
  }

  playerLeftGame(payload: PlayerLeftDto) {
    return this.gameService.playerLeftGame(payload);
  }

  listAvailableGames(payload: AvailableGameDto) {
    return this.gameService.listAvailableGames(payload);
  }
}
