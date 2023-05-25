import styles from './not-found.module.scss'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className={styles.not_found}>
            <div className={styles.not_found}>
                <h2>404</h2>
                <h3>Page Not Found</h3>
                <p>The Page you are looking for doesn't exist or an other error occured. Go to <Link href="/">Home</Link> </p>
            </div>
        </div>
    );
}