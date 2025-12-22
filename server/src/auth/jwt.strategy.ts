import { Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super ({
            // For token header extraction: "Bearer <token>"
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Rejecting expired tokens
            secretOrKey: process.env.JWT_SECRET || 'chotu-super-secret-key',
        });
    }

    // payload = token inside data
    async validate(payload: {sub: string}) {
        const user = await this.authService.getUserById(payload.sub);

        if(!user) {
            throw new UnauthorizedException("User Not Found!")
        }

        return user;
    }
}