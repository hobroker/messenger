import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './app.config';
import { GcsModule } from './modules/gcs';
import { TelegramModule } from './modules/telegram';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    GcsModule,
    TelegramModule,
  ],
})
export class AppModule {}
