import { Global, Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GAME_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GAME_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:' + '50002',
          package: GAME_PACKAGE_NAME,
          protoPath: join(__dirname, '../game.proto'),
        },
      },
    ]),
    AuthModule,
  ],
  providers: [GameService],
  controllers: [GameController],
  exports: [
    ClientsModule.register([
      {
        name: 'GAME_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:' + '50002',
          package: GAME_PACKAGE_NAME,
          protoPath: join(__dirname, '../game.proto'),
        },
      },
    ]),
  ],
})
export class GameModule {}
