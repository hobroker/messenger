import { Controller, Get, Param } from '@nestjs/common';
import { FileActionsService, GcsService } from '../services';

@Controller('gcs')
export class GcsController {
  constructor(
    private gcs: GcsService,
    private fileActions: FileActionsService,
  ) {}

  @Get(':file/:defaultData/:action')
  async getDataThenAction(@Param() params) {
    const { file, defaultData, action } = params;
    const raw = await this.gcs.upsertFileContents(file, defaultData);
    const data = this.fileActions.handle(action, raw);

    await this.gcs.saveFile(file, data);

    return raw;
  }

  // @Get(':file/:defaultData/:action')
  // async getDataWithAction(@Param() params) {
  //   const { file, defaultData, action } = params;
  //   const raw = await this.gcs.upsertFileContents(file, defaultData);
  //   const data = this.fileActions.handle(action, raw);
  //
  //   await this.gcs.saveFile(file, data);
  //
  //   return data;
  // }
}
