import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Telegram } from 'telegraf';
import { telegramConfig } from '../telegram.config';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegram;

  constructor(
    @Inject(telegramConfig.KEY)
    private config: ConfigType<typeof telegramConfig>,
  ) {
    this.bot = new Telegram(config.token);
  }

  async sendMessage(app: string, message: string) {
    const text = `*${app}*\n${message}`;

    return this.bot.sendMessage(this.config.chatId, text, {
      parse_mode: 'Markdown',
      disable_notification: true,
    });
  }

  async onModuleInit() {
    // await this.sendMessage('rsnapshot', 'Online');
  }
}
