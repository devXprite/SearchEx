"use client";

import styles from "./loadmorebtn.module.scss";

export default function LoadmoreBtn({ onClick, isLoading }) {
    return (
        <div className={styles.loadmoreBtn}>
            <button onClick={onClick} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load more'}
            </button>
        </div>
    )
}