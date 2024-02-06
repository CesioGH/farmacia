import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({  //https://github.com/expressjs/cors?tab=readme-ov-file#configuration-options

  })

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new LogInterceptor())

  const prismaService = app.get(PrismaService);
  await prismaService.$connect();

  app.enableShutdownHooks(); 

  await app.listen(3005);
}
bootstrap();
