import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './entities/auth-payload.entity';
import { LoginInput } from './dto/login.input';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

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
