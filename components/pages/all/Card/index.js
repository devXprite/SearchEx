"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import CardSkeleton from "../CardSkeleton";
import styles from "./card.module.scss"

const ResultCard = () => {
    const searchParams = useSearchParams();
    const cardRef = useRef(null);
    const q = searchParams.get("q");

    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCardData = async () => {
            const response = await fetch(`/api/card?q=${q}`)
                .then((response) => response.json()).catch(() => setError(true));
                
            if (!response.content || response.content.length < 15) setError(true);


            setCardData(response);
            setLoading(false);
        }

        fetchCardData();

        return () => { setLoading(true); setError(false); }
    }, [q]);

    if (error) return;

    return (
        <div>
            {!loading ? (
                <div ref={cardRef} className={`${styles.card} ${cardData.type === "ai" ? styles.ai : ""}`}>
                    <div className={styles.card__body}>
                        {cardData.image && <img src={cardData.image} />}
                        <h1 className={styles.title} >{cardData.title}</h1>
                        <p className={styles.description} >{cardData.description}</p>
                        <p className={styles.content} dangerouslySetInnerHTML={{ __html: cardData.content }} />
                    </div>
                </div>
            ) : (
                <CardSkeleton />
            )}
        </div>
    )
}

export default ResultCard;