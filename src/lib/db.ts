import {PrismaClient} from "@prisma/client"

declare global{
    var prisma : PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient()

//If not in production, then whenever due to hot reload, it is fired, it will use existing prisma client else new prisma client would be created each time.
//Global is not affected by hot reload
if(process.env.NODE_ENV!="production")
    globalThis.prisma = db