"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Card from "@/components/pages/images/Card";
import CardSkeleton from "@/components/pages/images/CardSkeleton";
import LoadmoreBtn from "@/components/shared/LoadmoreBtn";

const Page = (props) => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
        fetch(`/api/search/images?q=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setResults((results) => [...results, ...data || []]);
                setLoading(false)
            })
    }, [query, page])

    useEffect(() => { setResults([]), setLoading(true) }, [query]);

    if (loading) {
        return (
            <div className={styles.searchPage}>
                <div className={styles.results__container}>
                    {Array.from(Array(15).keys()).map((i) => <CardSkeleton key={i} />)}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.searchPage}>
            <div className={styles.results__container}>
                {results.map(result => (
                    <Card key={result.link} results={result} />
                ))}
            </div>
            {
                (page < 5) && <LoadmoreBtn isLoading={isMoreLoading} onClick={() => { setPage((page) => page + 1); setIsMoreLoading(true) }} />
            }
        </div>
    )
}

export default Page