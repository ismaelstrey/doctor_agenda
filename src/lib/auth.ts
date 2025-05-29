
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"
import * as scehema from "../db/schema";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "pg" or "mysql"
        usePlural: true,
        schema: scehema
    }),
    user: {
        modelName: "usersTable",

    },
    session: {
        modelName: "sessionTable",
    },
    account: {
        modelName: "accountTable",
    },
    verification: {
        modelName: "verificationTable",
    },
    emailAndPassword: {
        enabled: true,
    }
    //... the rest of your config
});

