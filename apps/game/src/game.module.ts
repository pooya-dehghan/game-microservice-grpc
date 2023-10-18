import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { DatabaseModule } from 'libs/common/src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [GameController],
  providers: [
    GameService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class GameModule {}
