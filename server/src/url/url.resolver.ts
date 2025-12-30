import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UrlService } from  './url.service.js';
import { Url } from './entities/url.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateUrlInput } from './dto/create-url.input.js';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Url)
export class UrlResolver {
    constructor(private urlService: UrlService) {}

    // Protected Route - To create the Chotu URL
    @Mutation(() => Url)
    @UseGuards(JwtAuthGuard)
    async createUrl(
        @Args('input') input: CreateUrlInput,
        @Context() context: any
    ) {
        const userId = context.req.user.id;
        return this.urlService.createUrl(userId, input);
    }

    // Protected Route - To get the all Urls
    @Query(() => [Url])
    @UseGuards(JwtAuthGuard)
    async myUrls(@Context() context: any) {
        const userId = context.req.user.id;
        return this.urlService.getUserUrls(userId);
    }

    // Protected Route - To Delte a Chotu Url
    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard)
    async deleteUrl(
        @Args('urlId') urlId: string,
        @Context() context: any
    ) {
        const userId = context.req.user.id;
        return this.urlService.deleteUrl(userId, urlId);
    }

    // To check Chotu Url clicks
    @ResolveField(() => Int)
    clickCount(@Parent() url: any) {
        return url._count?.clicks || 0;
    }
}
