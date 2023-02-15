import styles from "./loader.module.scss"

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}