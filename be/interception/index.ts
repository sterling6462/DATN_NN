import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();
    const info = `url: ${req.url}, body: ${JSON.stringify(req.body)}, query: ${JSON.stringify(req.query)}`;
    const now = Date.now();
    this.logger.log(`Request ${info} start.`);
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Request ${info} end +${Date.now() - now}ms.`)),
      );
  }
}
