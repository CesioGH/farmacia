import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
    this.setUpGracefulShutdown();
  }

  setUpGracefulShutdown() {
    const shutdownHandler = async (signal: string) => {
      console.log(`Received ${signal}. Graceful shutdown start`);
      await this.$disconnect();
      process.exit(0);
    };

    process.on('SIGINT', shutdownHandler);
    process.on('SIGTERM', shutdownHandler);
  }
}
