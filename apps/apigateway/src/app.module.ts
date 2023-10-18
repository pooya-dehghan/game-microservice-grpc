import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [AuthModule, GameModule, LeaderboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
