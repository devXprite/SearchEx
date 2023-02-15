import { getServerSession } from "next-auth"
import mongoClient from "@/utils/db"
import Link from "next/link";

export default async function Page() {
    const session = await getServerSession();
    const email = session?.user?.email;
    const name = session?.user?.name || session?.user?.email.split('@')[0];

    const client = await mongoClient;
    const db = client.db();

    const searchHistory = await db.collection("history").find({
        email: email
    }).toArray();
  
    return (
        <div>
            <h2> Search History of {name} </h2>

            <table>
                <thead>
                    <tr>
                        <th>Query</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {searchHistory.map((item) => (
                        <tr key={item._id}>
                            <td><Link href={`/search?q=${item.query}`}>{item.query}</Link></td>
                            <td>{item.localTimestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}