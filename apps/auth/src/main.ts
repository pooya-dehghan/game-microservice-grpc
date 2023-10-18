import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC, // Replace with your chosen transporter
      options: {
        url: '0.0.0.0:' + "50001",
        protoPath: join(__dirname, '../auth.proto'),
        package: 'auth',
      },
    },
  );
  await app.listen();
}
bootstrap();
