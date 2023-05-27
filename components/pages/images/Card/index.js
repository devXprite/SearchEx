import styles from "./style.module.scss"

const Card = ({ results }) => {
    const {thumbnail, link, snippet, title} = results;

    return (
        <a className={styles.card} href={link}>
            <div className={styles.card__image}>
                <img src={thumbnail} alt="" />
            </div>
            <div className={styles.card__content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.snippet}>{snippet}</p>
            </div>
        </a>
    )
}

export default Card;