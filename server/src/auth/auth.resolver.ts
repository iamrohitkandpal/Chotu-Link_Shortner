import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';
import { RegisterInput } from './dto/register.input.js';
import { AuthPayload } from './entities/auth-payload.entity.js';
import { LoginInput } from './dto/login.input.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { UseGuards } from '@nestjs/common';
import { User } from '../user/entities/user.entity.js';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    // To do Register Mutation
    @Mutation(() => AuthPayload)
    async register(@Args('input') input: RegisterInput) {
        return this.authService.register(input);
    }

    // To do Login Mutation
    @Mutation(() => AuthPayload)
    async login(@Args('input') input: LoginInput) {
        return this.authService.login(input);
    }

    // To Get Current Logged User 
    @Query(() => User)
    @UseGuards(JwtAuthGuard)    // Protection Token Required
    async me(@Context() context: any) {
        // context.req.user JWT Strategy ne set kiya hai
        return context.req.user;
    }
}
