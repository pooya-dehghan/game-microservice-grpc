// userService.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { AuthService } from '../../../apps/auth/src/auth.service';
import { DatabaseModule } from '../../../libs/common/src/database/database.module';
import { DatabaseService } from '../../../libs/common/src/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

const mockJwtModule = JwtModule.register({
  secret: 'secret for grpc game project', // Replace with your secret key
});

const mockConfigModule = ConfigModule.forRoot({
  isGlobal: true,
});

describe('GameService', () => {
  let service: GameService;
  let authService: AuthService;
  let DbService: DatabaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, mockJwtModule, mockConfigModule],
      providers: [GameService, DatabaseService, AuthService],
    }).compile();
    service = module.get<GameService>(GameService);
    authService = module.get<AuthService>(AuthService);
    DbService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a game', async () => {
    const userSignUpDto = {
      username: 'jafaryek',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const createGameDto = {
      name: 'mysocialgame',
      maxMembers: 4,
      status: 'pending',
      creator: userWithId.id,
    };
    const game = await service.CreateGame(createGameDto);
    expect(game).toBeDefined();
    expect(game.name).toBeDefined();
    expect(game.name).toBe(createGameDto.name);
    expect(game.status).toBe(createGameDto.status);
  });

  it('should find a uniquely game based on its id', async () => {
    const userSignUpDto = {
      username: 'mohsen',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const createGameDto = {
      name: 'mysocialgame',
      maxMembers: 4,
      status: 'pending',
      creator: userWithId.id,
    };
    const game = await service.CreateGame(createGameDto);
    const gameWithId = await DbService.game.findFirst({
      where: {
        name: createGameDto.name,
      },
    });
    const gameFound = await service.FindOneGame({
      id: gameWithId.id.toString(),
    });
    expect(gameFound).toBeDefined();
    expect(gameFound.name).toBeDefined();
  });

  it('should start a game successfuly based on correct inputs', async () => {
    const userSignUpDto = {
      username: 'reza',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const createGameDto = {
      name: 'netherlandoffice',
      maxMembers: 4,
      status: 'pending',
      creator: userWithId.id,
    };
    const game = await service.CreateGame(createGameDto);
    const gameWithId = await DbService.game.findFirst({
      where: {
        name: createGameDto.name,
      },
    });
    const startGameDto = {
      creator: userWithId.id.toString(),
      gameId: gameWithId.id.toString(),
    };
    const startedGame = await service.StartGame(startGameDto);
    expect(startedGame).toBeDefined();
    expect(startedGame.maxMembers).toBeDefined();
    expect(startedGame.maxMembers).toBe(createGameDto.maxMembers);
    expect(startedGame.status).toBe('playing');
  });

  it('should successfuly add user to the game', async () => {
    const userSignUpDto = {
      username: 'jafar',
      password: '123321pp',
    };
    const userToBeAddedDto = {
      username: 'pooryia',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userToBeAdded = await authService.signUp(userToBeAddedDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const userToBeAddedWithId = await DbService.user.findUnique({
      where: {
        username: userToBeAdded.username,
      },
    });
    const createGameDto = {
      name: 'mysocialgame',
      maxMembers: 4,
      status: 'pending',
      creator: userWithId.id,
    };
    const game = await service.CreateGame(createGameDto);
    const gameWithId = await DbService.game.findFirst({
      where: {
        name: game.name,
      },
    });
    const addUserToGameDto = {
      userToBeAdded: userToBeAddedWithId.id,
      gameId: gameWithId.id,
      creatorId: userWithId.id,
    };
    const gameupdated = await service.addUserToGame(addUserToGameDto);
    expect(gameupdated).toBeDefined();
    expect(gameupdated.name).toBeDefined();
    expect(gameupdated.name).toBe(createGameDto.name);
    expect(gameupdated.status).toBe(createGameDto.status);
  });

  it('should successfuly collect point for player', async () => {
    const userSignUpDto = {
      username: 'eiman',
      password: '123321pp',
    };
    const userToBeAddedDto = {
      username: 'pelato',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userToBeAdded = await authService.signUp(userToBeAddedDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const userToBeAddedWithId = await DbService.user.findUnique({
      where: {
        username: userToBeAdded.username,
      },
    });
    const createGameDto = {
      name: 'teraform',
      maxMembers: 4,
      status: 'pending',
      creator: userWithId.id,
    };
    const game = await service.CreateGame(createGameDto);
    const gameWithId = await DbService.game.findFirst({
      where: {
        name: game.name,
      },
    });
    const addUserToGameDto = {
      userToBeAdded: userToBeAddedWithId.id,
      gameId: gameWithId.id,
      creatorId: userWithId.id,
    };
    const startGameDto = {
      creator: userWithId.id.toString(),
      gameId: gameWithId.id.toString(),
    };
    const startedGame = await service.StartGame(startGameDto);
    const gameWithIdStarted = await DbService.game.findFirst({
      where: {
        name: game.name,
      },
    });
    const gameupdated = await service.addUserToGame(addUserToGameDto);

    const collectPointDto = {
      playerID: userToBeAddedWithId.id,
      gameID: gameWithId.id,
      pointCollected: 40,
    };
    const collectPoint = await service.collectPoint(collectPointDto);
    expect(collectPoint).toBeDefined();
    expect(collectPoint.name).toBeDefined();
    expect(collectPoint.name).toBe(createGameDto.name);
    expect(collectPoint.status).toBe('playing');
  });

  it('should successfuly finish a game', async () => {
    const userSignUpDto = {
      username: 'ehsan',
      password: '123321pp',
    };
    const userToBeAddedDto = {
      username: 'javad',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userToBeAdded = await authService.signUp(userToBeAddedDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const userToBeAddedWithId = await DbService.user.findUnique({
      where: {
        username: userToBeAdded.username,
      },
    });
    const createGameDto = {
      name: 'teenganer',
      maxMembers: 4,
      status: 'pending',
      creator: userWithId.id,
    };
    const game = await service.CreateGame(createGameDto);
    const gameWithId = await DbService.game.findFirst({
      where: {
        name: game.name,
      },
    });
    const startGameDto = {
      creator: userWithId.id.toString(),
      gameId: gameWithId.id.toString(),
    };
    const addUserToGameDto = {
      userToBeAdded: userToBeAddedWithId.id,
      gameId: gameWithId.id,
      creatorId: userWithId.id,
    };
    const gameupdated = await service.addUserToGame(addUserToGameDto);
    const startedGame = await service.StartGame(startGameDto);
    const collectPointDto = {
      gameID: gameWithId.id,
    };

    const finishGame = await service.gameFinishResults(collectPointDto);
    expect(finishGame).toBeDefined();
    expect(finishGame.winnerID).toBeDefined();
    expect(finishGame.winnerID).toBeDefined();
  });

  it('should successfuly list available games', async () => {
    const userSignUpDto = {
      username: 'taghi',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const createGameDto = {
      name: 'teenganer',
      maxMembers: 4,
      status: 'pending',
      creator: userWithId.id,
    };
    const game = await service.CreateGame(createGameDto);
    const games = await DbService.game.findMany();
    const listAvailableGame = {
      userID: userWithId.id,
    };
    const availableGames = await service.listAvailableGames(listAvailableGame);
    expect(availableGames).toBeDefined();
  });

  afterAll(async () => {
    await DbService.leaderBoard.deleteMany();
    await DbService.score.deleteMany();
    await DbService.game.deleteMany();
    await DbService.user.deleteMany();
  });
});
