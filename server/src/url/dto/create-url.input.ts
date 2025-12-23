import { InputType, Field } from "@nestjs/graphql";
import { IsUrl } from "class-validator";

@InputType()
export class CreateUrlInput {
    @Field()
    @IsUrl({}, {message: 'Valid URL daalo bhaiya!'})
    originalUrl: string;
}