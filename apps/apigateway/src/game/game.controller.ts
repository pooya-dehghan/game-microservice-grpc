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
import { ExceptionFilter } from '@app/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { GameService } from './game.service';
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
import { JwtGuard } from '../auth/guard';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';

@ApiTags('game')
@Controller('game')
@UseInterceptors(GrpcToHttpInterceptor)
@UseFilters(new ExceptionFilter())
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Post('create-game')
  async createGame(@Body() payload: CreateGametDto) {
    return this.gameService.createGame(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Get('/:gameID')
  async finOneGame(@Param('gameID', ParseIntPipe) payload: number) {
    return this.gameService.findOneGame(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Post('start-game')
  async startGame(@Body() payload: StartGameDto) {
    return this.gameService.startGame(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Post('add-player')
  async addUserToGame(@Body() payload: AddUserDto) {
    return this.gameService.addUserToGame(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Post('collect-point')
  async collectPoint(@Body() payload: CollectPointDto) {
    return this.gameService.collectPoint(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Post('finish-game-result')
  async finishGameResult(@Body() payload: GameFinishDto) {
    return this.gameService.gameFinishResults(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Post('player-left-game')
  async playerLeftGame(@Body() payload: PlayerLeftDto) {
    return this.gameService.playerLeftGame(payload);
  }

  @ApiBasicAuth()
  @UseGuards(JwtGuard)
  @Get('available-games')
  async listAvailableGame(@Body() payload: AvailableGameDto) {
    return this.gameService.listAvailableGames(payload);
  }
}
