import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserController } from './create-user/create-user.controller';
import { SendMailConsumer } from './jobs/sendMail-consumer';
import { SendMailProducerService } from './jobs/sendMail-producer-service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASS
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue'
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      }
    }),
  ],
  controllers: [AppController, CreateUserController],
  providers: [
    AppService,
    SendMailProducerService,
    SendMailConsumer
  ],
})
export class AppModule {}
