import { NestFactory } from '@nestjs/core';
import { LeaderboardModule } from './leaderboard.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LeaderboardModule,
    {
      transport: Transport.GRPC, // Replace with your chosen transporter
      options: {
        url: '0.0.0.0:' + '50003',
        protoPath: join(__dirname, '../leaderboard.proto'),
        package: 'leaderboard',
      },
    },
  );
  await app.listen();
}
bootstrap();
