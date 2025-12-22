import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, IsOptional } from 'class-validator';

// GraphQL Mein input type banega (Baadme Mutation ke liye)
@InputType()
export class RegisterInput {
    @Field() // GraphQl Field
    @IsEmail({}, { message: "Valid Email Daalo Bhai!" }) //Email Validator
    email: string; 

    @Field() // GraphQl Field
    @MinLength(6, { message: "Thoda Takatwar Password Daalo Bhai! Min 6 Characters" }) //Password Validator
    password: string;

    @Field({ nullable: true }) // GraphQl Optional Field
    @IsOptional() //Email Validator
    name?: string; 
}
