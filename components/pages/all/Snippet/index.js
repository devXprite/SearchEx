import styles from "./style.module.scss"

const ResultsSnippet = ({ results }) => {
    const { title,link, displayLink, snippet, favicon, thumbnail } = results;

    return (
        <a className={styles.resultsSnippet} href={link}>
            <div className={styles.head}>
                <img src={favicon} alt="favicon" className={styles.favicon} />
                <p className={styles.url}>{displayLink}</p>
            </div>
            <div className={styles.content}>
                <div className={styles.body}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.snippet}>{snippet}</p>
                </div>
                {thumbnail && <img src={thumbnail} alt="thumbnail" className={styles.cse} />}
            </div>
        </a>
    )
}

export default ResultsSnippet;