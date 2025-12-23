import {AuthGuard} from '@nestjs/passport';
import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContext, Injectable } from "@nestjs/common";

// GraphQl AuthGuard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // GraphQl context se request nikalo (Diff from REST)
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}