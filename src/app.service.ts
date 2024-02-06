import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  private prisma: PrismaClient = new PrismaClient();

  getHello(): string {
    return 'Hello World! modificado';
  }
  getExample(): string {
    return "agora cXCASCASom método";
  }

  
}

