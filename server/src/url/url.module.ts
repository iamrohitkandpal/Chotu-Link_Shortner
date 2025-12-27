import { Module } from '@nestjs/common';
import { UrlService } from './url.service.js';
import { UrlResolver } from './url.resolver.js';
import { UrlController } from './url.controller.js';

@Module({
  controllers: [UrlController],
  providers: [UrlService, UrlResolver]
})
export class UrlModule {}
