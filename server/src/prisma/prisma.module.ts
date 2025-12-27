import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global()
// Global - Isko laga diya to sidha AppModule me import karo ek baar
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
