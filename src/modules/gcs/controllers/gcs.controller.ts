import { Controller, Get } from '@nestjs/common';

@Controller('gcs')
export class GcsController {
  @Get()
  root() {
    return {
      message: 'Hello World!',
    };
  }
}
