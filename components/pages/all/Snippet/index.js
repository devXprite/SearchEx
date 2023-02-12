"use client";

import styles from "./style.module.scss"
import { useRouter } from "next/navigation"

const ResultsSnippet = ({ results }) => {
    const { title, link, displayLink, formattedUrl, htmlFormattedUrl, snippet, htmlSnippet, favicon, cse } = results;
    const router = useRouter()

    return (
        <div className={styles.resultsSnippet} onClick={() => { window.location.href = formattedUrl }}>
            <div className={styles.head}>
                <img src={favicon} alt="favicon" className={styles.favicon} />
                <p className={styles.url}>{displayLink}</p>
            </div>
            <div className={styles.content}>
                <div className={styles.body}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.snippet}>{snippet}</p>
                </div>
                {cse && <img src={cse} alt="cse" className={styles.cse} />}
            </div>
        </div>
    )
}

export default ResultsSnippet;