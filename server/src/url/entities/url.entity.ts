import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Url {
    @Field(() => ID)
    id: string;

    @Field()
    shortCode: string;

    @Field()
    originalUrl: string;

    @Field(() => Int)
    clickCount: number;

    @Field()
    createdAt: Date;

    @Field(() => User)
    user: User;
}