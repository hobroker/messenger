import { Injectable } from '@nestjs/common';
import { toString } from 'rambda';

@Injectable()
export class FileActionsService {
  increment(raw: string) {
    const number = Number(raw);

    return toString(number + 1);
  }

  decrement(raw: string) {
    const number = Number(raw);

    return toString(number + 1);
  }

  handle(action: string, raw: string) {
    switch (action) {
      case 'increment':
        return this.increment(raw);
      case 'decrement':
        return this.decrement(raw);
      default:
        throw new Error(`Action ${action} not supported`);
    }
  }
}
