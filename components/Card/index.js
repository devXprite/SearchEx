"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
// import styles from "./card.module.scss"

const Card = async () => {

    const searchParams = useSearchParams();
    const q = searchParams.get("q");

    const [ cardData, setCardData ] = useState(null);

    useEffect(() => {
        const fetchCardData = async () => {
            const response = await fetch(`/api/card?q=${q}`)
            .then((response) => response.json())

            setCardData(response);
        }

        fetchCardData();
    }, [q]);

    return(
        <>
             {cardData ? (
                <div>
                    {cardData.image && <img src={cardData.image} />}
                    <h1>{cardData.title}</h1>
                    <p>{cardData.description}</p>
                    {/* <div dangerouslySetInnerHTML={{ __html: cardData.content }} /> */}
                </div>
            ) : (
                <p>Loading...</p>
            )
            } 
        </>
    )
}

export default Card;