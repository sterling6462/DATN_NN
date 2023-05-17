import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Collection, Connection } from 'mongoose';
import { BaseLogger } from '../../core/logger';

@Injectable()
export class DataService extends BaseLogger {
//   private readonly studioYtbCollection: Collection;
  constructor(@InjectConnection() private connection: Connection) {
    super(DataService.name);
    // this.studioYtbCollection = this.connection.collection('studio_ytb');
  }
}
