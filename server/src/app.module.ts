import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Apollo Server Adapter

      // TS Classes First to generate GraphQL schema
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // For development testing of server in browser
      playground: true,
      // Sorting for a clean look nothing else and this is me Rohit writing this not a bot ok.
      sortSchema: true,
    }),

    AuthModule
  ],
})

export class AppModule { }
