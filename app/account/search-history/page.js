import { getServerSession } from "next-auth"
import mongoClient from "@/utils/db"
import Link from "next/link";
import styles from "./page.module.scss";
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const formarTimeStamp = (timestamp) => {
    const date = new Date(timestamp);

    return date;
}

export default async function Page() {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const name = session?.user?.name || session?.user?.email.split('@')[0];

    const client = await mongoClient;
    const db = client.db();

    console.log(email);

    const searchHistory = await db.collection("history").find({
        email: email
    }).limit(200).toArray();



    console.log(searchHistory);

    return (
        <div className={styles.page}>
            <h2> Search History of {name} </h2>

            {(searchHistory.length > 0)
                ? (
                    <div className={styles.history}>
                        {searchHistory.map((item, index) => (
                            <p className={styles.item} key={index}>
                                <span className={styles.item__timestamp}>
                                    {(item.localTimestamp)}
                                </span>
                                <span className={styles.item__query}>
                                    {item.query}
                                </span>
                                <span className={styles.item__path}>
                                    {item.path}
                                </span>
                            </p>
                        ))}
                    </div>
                    // <table>
                    //     <thead>
                    //         <tr>
                    //             <th>Timestamp</th>
                    //             <th>Query</th>
                    //             <th>Path</th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         {searchHistory.map((item, index) => (
                    //             <tr key={index}>
                    //                 <td>{formarTimeStamp(item.localTimestamp).toLocaleString()}</td>
                    //                 <td>{item.query}</td>
                    //                 <td>{item.path}</td>
                    //             </tr>
                    //         ))}
                    //     </tbody>
                    // </table>
                )
                : (<p>No Search History found!</p>)
            }

        </div>
    )
}