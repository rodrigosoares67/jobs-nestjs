import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
class SendMailProducerService {

  constructor(@InjectQueue('sendMail-queue') private queue: Queue){}

  async sendMail(createUserDTO: CreateUserDTO){
    await this.queue.add("sendMail-job", createUserDTO)
  }

}

export { SendMailProducerService }