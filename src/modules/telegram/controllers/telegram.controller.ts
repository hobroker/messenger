import { Controller, Get, Param, Query } from '@nestjs/common';
import { TelegramService } from '../services';

@Controller('telegram')
export class TelegramController {
  constructor(private telegram: TelegramService) {}

  @Get(':app')
  async send(@Param('app') app: string, @Query('data') data: string) {
    await this.telegram.sendMessage(app, data);

    return;
  }
}
