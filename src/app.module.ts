import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
      ConfigModule.forRoot(),
      ThrottlerModule.forRoot([{ //https://github.com/nestjs/throttler
        ttl:60000,
        limit:100,
        ignoreUserAgents: [ // usado para permitir alguém ultrapassar o limite
         // /googlebot/gi    se for uma api indexavel tem que liberar pro google e tals
        ]
      }]),
    forwardRef(()=>UserModule) ,
    forwardRef(()=>AuthModule),
    MailerModule.forRoot({
      transport: {host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'bria.wisozk71@ethereal.email',
          pass: 'nwk5y9AUdjDwvq7fj2'
      }},
      defaults: {
        from: '"nest-modules" <bria.wisozk71@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
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
