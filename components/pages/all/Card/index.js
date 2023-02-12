"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./card.module.scss"

const ResultCard = () => {

    const searchParams = useSearchParams();
    const q = searchParams.get("q");

    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        const fetchCardData = async () => {
            const response = await fetch(`/api/card?q=${q}`)
                .then((response) => response.json())

            setCardData(response);
        }

        fetchCardData();
    }, [q]);

    return (
        <div>
            <div className={styles.card}>
                {cardData ? (
                    <div className={styles.card__body}>
                        {cardData.image && <img src={cardData.image} />}
                        <h1 className={styles.title} >{cardData.title}</h1>
                        <p className={styles.description} >{cardData.description}</p>
                        <p className={styles.content} dangerouslySetInnerHTML={{ __html: cardData.content }} />
                    </div>
                ) : (
                    <h3>Card is loading</h3>
                )}
            </div>
        </div>
    )
}

export default ResultCard;