import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GcsModule } from './modules/gcs';
import { appConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    GcsModule,
  ],
})
export class AppModule {}
