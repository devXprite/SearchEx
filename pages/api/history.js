import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import mongoClint from "@/utils/db";

export default async function handler(req, res) {

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ message: 'Not authenticated' })
        return
    }

    const { email } = session.user;
    const { q: query, t: localTimestamp,p: path } = req.query;

    if (!query || !localTimestamp || !email) {
        res.status(400).json({ message: 'Bad request' })
        return
    }

    console.log(`Calling History API with email: ${email}, query: ${query}, path: ${path}, localTimestamp: ${localTimestamp}`);

    const client = await mongoClint;
    const db = client.db();

    const result = await db.collection('history').insertOne({
        email,
        query,
        path,
        localTimestamp
    })

    res.status(204).end()
}
