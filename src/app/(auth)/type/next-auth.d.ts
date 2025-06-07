import NextAuth, {DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
interface IUser {
    id: string;
    name: string;
    email: string;
    isVerify: boolean;
    type: string;
    role: string;
    }

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        user: IUser;
        access_expire: number;
        error: string;
        
    }
}

declare module "next-auth" {
    interface Session {
        user: IUser;
        accessToken: string;
        refreshToken: string;
        access_expire: number;
        error: string;
    }
}