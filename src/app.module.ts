import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
      ThrottlerModule.forRoot([{ //https://github.com/nestjs/throttler
        ttl:60000,
        limit:100,
        ignoreUserAgents: [ // usado para permitir alguém ultrapassar o limite
         // /googlebot/gi    se for uma api indexavel tem que liberar pro google e tals
        ]
      }]),
    forwardRef(()=>UserModule) ,
    forwardRef(()=>AuthModule)
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  exports: [
    AppService
  ]
  
})
export class AppModule {}
