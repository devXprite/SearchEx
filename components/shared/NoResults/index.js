import styles from "./noResults.module.scss"

export default function NoResults({ query, type="documents" }) {
    return (
        <div className={styles.noResults}>
            <h1>Your search - <b>{query}</b> - did not match any {type}.</h1>
            <p>Suggestions:</p>
            <ul>
                <li>Make sure that all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
            </ul>
        </div>
    )
}
