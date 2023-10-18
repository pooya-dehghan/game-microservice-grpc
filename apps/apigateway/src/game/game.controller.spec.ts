import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { CreateGametDto, StartGameDto, AddUserDto } from './dto';
import { GameService } from './game.service';

describe('GameController', () => {
  let controller: GameController;
  let gameService: GameService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();

    controller = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createGame', () => {
    it('should create a new game', async () => {
      const createGameDto: CreateGametDto = {
        creator: 1,
        status: 'created',
        maxMembers: 4,
        name: 'LORDS',
      };
      const expectedResult = {
        name: 'LORDS',
        status: 'created',
      };

      // jest.spyOn(gameService, 'createGame').mockResolvedValue(expectedResult);

      const result = await controller.createGame(createGameDto);

      expect(result).toEqual(expectedResult);
    });
  });
});
