// pages/api/auth/[...nextauth].ts  OR  app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;

            try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                }),
            });

            if (!response.ok) return null;

            const data = await response.json();

            console.log(data);

            return data;

            // Flatten the response so NextAuth can work with it
            // return {
            //     id: data.user.id,
            //     email: data.user.email,
            //     name: data.user.name,
            //     accessToken: data.backendTokens.accessToken,
            //     refreshToken: data.backendTokens.refreshToken,
            // };
            } catch (err) {
            console.error(err);
            return null;
            }
        },
        }),
    ],
    callbacks: {
        // 1. Persist tokens into the JWT
        async jwt({ token, user }) {
            console.log('token', token);
            console.log('userrr', user);

            if (user) {
                return {...token, ...user};
            }

            return token;
        },
    // 2. Expose what you want on the client-side session
        async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}