import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlResolver } from './url.resolver';

@Module({
  providers: [UrlService, UrlResolver]
})
export class UrlModule {}
