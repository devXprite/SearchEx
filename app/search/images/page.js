"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Card from "@/components/pages/images/Card";
import CardSkeleton from "@/components/pages/images/CardSkeleton";
import LoadmoreBtn from "@/components/shared/LoadmoreBtn";
import axios from "axios";
import NoResults from "@/components/shared/NoResults";

const Page = (props) => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
        axios.get(`/api/search/images?q=${query}&page=${page}`)
            .then(res => {
                setResults((results) => [...results, ...res.data || []]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
                setIsMoreLoading(false);
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

    if (results.length === 0) {
        return (<NoResults query={query} type="Images" />)
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