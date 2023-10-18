import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
<<<<<<< HEAD

@Module({
  providers: [LeaderboardService],
  controllers: [LeaderboardController]
=======
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LEADERBOARD_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  providers: [LeaderboardService],
  controllers: [LeaderboardController],
  imports: [
    ClientsModule.register([
      {
        name: 'LEADERBOARD_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:' + '50003',
          package: LEADERBOARD_PACKAGE_NAME,
          protoPath: join(__dirname, '../leaderboard.proto'),
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: 'LEADERBOARD_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:' + '50003',
          package: LEADERBOARD_PACKAGE_NAME,
          protoPath: join(__dirname, '../leaderboard.proto'),
        },
      },
    ]),
  ],
>>>>>>> develop
})
export class LeaderboardModule {}
