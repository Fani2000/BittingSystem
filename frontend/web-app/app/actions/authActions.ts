'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { headers, cookies } from 'next/headers'
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export async function getSession() {
    const session = await getServerSession(authOptions);
    // console.log(session)
    return session
}

export async function getCurrentUser() {
    try {
        const session = await getSession();
        // console.log({ session })

        if (!session) return null;

        return session.user;

    } catch (error) {
        console.log("Error: 💥💥💥", error)
        return null;
    }
}

export const getTokenWorkaround = async () => {
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(cookies().getAll().map(c => [c.name, c.value]))
    } as NextApiRequest

    return await getToken({ req })
}