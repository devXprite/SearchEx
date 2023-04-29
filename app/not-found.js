import styles from './not-found.module.scss'

export default function NotFound() {
    return (
        <div className={styles.not_found}>
            <div className={styles.not_found}>
                <h2>404</h2>
                <p>The page you requested could not found</p>
            </div>
        </div>
    );
}