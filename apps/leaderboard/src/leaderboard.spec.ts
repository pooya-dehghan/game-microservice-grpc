// userService.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardService } from './leaderboard.service';
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

describe('LeaderboardService', () => {
  let service: LeaderboardService;
  let DbService: DatabaseService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, mockJwtModule, mockConfigModule],
      providers: [LeaderboardService, DatabaseService, AuthService],
    }).compile();
    service = module.get<LeaderboardService>(LeaderboardService);
    DbService = module.get<DatabaseService>(DatabaseService);
    authService = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a leaderboard and return name', async () => {
    const userSignUpDto = {
      username: 'hasan',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: userSignUpDto.username,
      },
    });
    const leaderboardDto = {
      name: 'myleaderboard',
      creator: userWithId.id,
    };
    const leaderBoardCreated = await service.CreateLeaderBoard(leaderboardDto);
    expect(leaderBoardCreated).toBeDefined();
    expect(leaderBoardCreated.name).toBeDefined();
    expect(leaderBoardCreated.name).toBe(leaderboardDto.name);
  });

  it('should successfuly find a leaderboard and return name', async () => {
    const userSignUpDto = {
      username: 'mola',
      password: '123321pp',
    };
    const user = await authService.signUp(userSignUpDto);
    const userWithId = await DbService.user.findUnique({
      where: {
        username: userSignUpDto.username,
      },
    });
    const leaderboardDto = {
      name: 'yourleaderboard',
      creator: userWithId.id,
    };
    const leaderBoardCreated = await service.CreateLeaderBoard(leaderboardDto);
    const leaderBoardWithId = await DbService.leaderBoard.findUnique({
      where: {
        name: leaderboardDto.name,
      },
    });
    const findLeaderBoardDto = {
      leaderboardID: leaderBoardWithId.id,
    };
    const foundLeaderBoard = await service.FindLeaderBoard(findLeaderBoardDto);
    expect(foundLeaderBoard).toBeDefined();
    expect(foundLeaderBoard.name).toBeDefined();
    expect(foundLeaderBoard.name).toBe(leaderboardDto.name);
  });

  afterAll(async () => {
    await DbService.leaderBoard.deleteMany();
    await DbService.game.deleteMany();
    await DbService.user.deleteMany();
  });
});
