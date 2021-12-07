import { registerAs } from '@nestjs/config';
import { GCS_MODULE_ID } from './gcs.constants';

export const gcsConfig = registerAs(GCS_MODULE_ID, () => ({
  keyFilename: process.env.GCS_KEY_FILENAME,
  bucketName: process.env.GCS_BUCKET_NAME,
}));
