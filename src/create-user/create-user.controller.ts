import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';

@Controller('create-user')
export class CreateUserController {

  constructor(private sendMailService: SendMailProducerService){}

  @Post('/')
  async createUser(@Body() createUser: CreateUserDTO){
    this.sendMailService.sendMail(createUser)

    return createUser;
  }
}
