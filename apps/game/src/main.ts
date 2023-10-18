import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GameModule,
    {
      transport: Transport.GRPC, // Replace with your chosen transporter
      options: {
        url: '0.0.0.0:' + '50002',
        protoPath: join(__dirname, '../game.proto'),
        package: 'game',
      },
    },
  );
  await app.listen();
}
bootstrap();
