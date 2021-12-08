import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Bucket, Storage } from '@google-cloud/storage';
import { propEq, toString } from 'rambda';
import { gcsConfig } from '../gcs.config';

@Injectable()
export class GcsService implements OnModuleInit {
  private storage: Storage;
  private bucket: Bucket;

  constructor(
    @Inject(gcsConfig.KEY)
    private config: ConfigType<typeof gcsConfig>,
  ) {
    this.storage = new Storage({
      keyFilename: config.keyFilename,
    });
  }

  async onModuleInit() {
    this.bucket = await this.getBucket();
  }

  getBucket() {
    return this.upsertBucket(this.config.bucketName);
  }

  async upsertFileContents(
    fileName: string,
    defaultContents: string,
  ): Promise<string> {
    const file = this.bucket.file(fileName);

    return file
      .download()
      .then(toString)
      .catch(() => {
        return this.saveFile(fileName, defaultContents);
      });
  }

  async getFileContents(fileName: string): Promise<string> {
    const file = this.bucket.file(fileName);

    return file.download().then(toString);
  }

  async saveFile(fileName: string, contents: string) {
    const file = this.bucket.file(fileName);

    await file.save(contents);

    return contents;
  }

  private async upsertBucket(name): Promise<Bucket> {
    const [buckets] = await this.storage.getBuckets();
    const bucket = buckets.find(propEq('name', name));

    if (bucket) {
      return bucket;
    }

    return this.storage.createBucket(name).then(([bucket]) => bucket);
  }
}
