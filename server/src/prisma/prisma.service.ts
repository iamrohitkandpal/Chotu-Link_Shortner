import { Injectable, OnModuleDestroy, OnModuleInit, } from '@nestjs/common';
// Injectable: For Dependency Injection
// OnModuleInit: For DB connection on server start
// OnModuleDestroy: For DB disconnection on server close

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../prisma/generated/prisma/client.js';

// Ye batata hai ki: "Is class me koi bhi inject kar sakte hai"
// Matlab: Dusri classes meni isko use kar sakte hai bina 'new' keyword use kare

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // PrismaClient extend = Can use PrismaService.user.findMany() directly
    // OnModuleInit implement = Create an onModuleInit() method
    // OnModuleDestroy implement = Create an onModuleDestroy() method 

    constructor() {
        // Adapter chahiye Prisma 7 me SQLite ke liye 
        const adapter = new PrismaBetterSqlite3({
            url: process.env.DATABASE_URL || 'file:./prisma/dev.db'
        })
       
        // Parent Class (PrismaClient) ko adapter bheja 
        super({ adapter })
    }

    // Prisma Module Start = DB Connection 
    async onModuleInit() {
        await this.$connect();
        console.log("DB Connected!")
    }
    
    // Prisma Module End = DB Disconnection
    async onModuleDestroy() {
        await this.$disconnect();
        console.log("DB Disconnected!")
    }
}
