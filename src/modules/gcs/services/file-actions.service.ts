import { Injectable } from '@nestjs/common';
import { toString } from 'rambda';

@Injectable()
export class FileActionsService {
  increment(raw: string) {
    const number = Number(raw);

    return toString(number + 1);
  }

  handle(action: string, raw: string) {
    switch (action) {
      case 'increment':
        return this.increment(raw);
      default:
        throw new Error(`Action ${action} not supported`);
    }
  }
}
