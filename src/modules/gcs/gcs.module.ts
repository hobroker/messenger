import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GcsController } from './controllers';
import { gcsConfig } from './gcs.config';
import { GcsService } from './services';

@Module({
  imports: [ConfigModule.forFeature(gcsConfig)],
  controllers: [GcsController],
  providers: [GcsService],
})
export class GcsModule {}
