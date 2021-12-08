import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { telegramConfig } from './telegram.config';
import { TelegramController } from './controllers';
import { TelegramService } from './services';

@Module({
  imports: [ConfigModule.forFeature(telegramConfig)],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
