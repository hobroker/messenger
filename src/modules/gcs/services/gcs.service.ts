import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Bucket, Storage } from '@google-cloud/storage';
import { propEq } from 'rambda';
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

  getBucket() {
    return this.upsertBucket(this.config.bucketName);
  }

  private async upsertBucket(name): Promise<Bucket> {
    const [buckets] = await this.storage.getBuckets();
    const bucket = buckets.find(propEq('name', name));

    if (bucket) {
      return bucket;
    }

    return this.storage.createBucket(name).then(([bucket]) => bucket);
  }

  async onModuleInit() {
    this.bucket = await this.getBucket();
  }
}
