import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [
    // Passport Configuration
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JWT Configuration
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Chotu-super-secret-key',
      signOptions: {
        expiresIn: '7d'
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
