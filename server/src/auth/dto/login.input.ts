import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

// GraphQL Mein input type banega (Baadme Mutation ke liye)
@InputType()
export class LoginInput {
    @Field() // GraphQl Field
    @IsEmail() //Email Validator
    email: string; 

    @Field() // GraphQl Field
    @MinLength(6) //Password Validator
    password: string; 
}
