"use client";

import styles from "./style.module.scss"
import {useRouter} from "next/navigation"

const ResultsSnippet = ({ results }) => {
    const { title, link, displayLink, formattedUrl, htmlFormattedUrl, snippet, htmlSnippet, favicon } = results;
    const router = useRouter()

    return (
        <div className={styles.resultsSnippet} onClick={router.push(formattedUrl)}>
            <div className={styles.head}>
                {/* <img src={favicon} alt="favicon" className={styles.favicon} /> */}
                <p className={styles.url}>{formattedUrl}</p>
            </div>
            <div className={styles.body}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.snippet}>{snippet}</p>
            </div>
        </div>
    )
}

export default ResultsSnippet;