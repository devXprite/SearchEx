"use client";

import styles from "./style.module.scss"

const Card = ({ results }) => {
    const {thumbnail, link, snippet, title} = results;

    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                <img src={thumbnail} alt="" />
            </div>
            <div className={styles.card__content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.snippet}>{snippet}</p>
            </div>
        </div>
    )
}

export default Card;