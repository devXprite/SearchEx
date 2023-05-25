"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ResultsSnippet from "@/components/pages/all/Snippet";
import styles from "./page.module.scss";
import ResultSkeleton from "@/components/pages/all/SnippetSkeleton";
import ResultCard from "@/components/pages/all/Card";
import NoResults from "@/components/shared/NoResults";
import LoadmoreBtn from "@/components/shared/LoadmoreBtn";
import axios from "axios";

const searchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
        axios.get(`/api/search/?q=${query}&page=${page}`)
            .then(res => {
                setResults((results) => [...results, ...res.data || []]);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
                setIsMoreLoading(false);
            })

    }, [query, page])

    useEffect(() => { setResults([]), setLoading(true) }, [query])

    if (error) {
        return (
            <>
                <div className={styles.searchPage}>
                    <div className={styles.results__container}>
                        <p>Something went wrong</p>
                    </div>
                </div>
            </>
        )
    }

    if (!loading && results.length === 0) {
        return (<NoResults query={query} />)
    }

    return (
        <>
            <div className={styles.searchPage}>
                <div className={styles.results__container}>

                    {
                        (loading) ? (
                            <>{Array.from(Array(10).keys()).map((i) => <ResultSkeleton key={i} />)}</>
                        ) : (
                            <>
                                {results.map(result => (
                                    <ResultsSnippet key={result.link} results={result} />
                                ))}
                                {(page < 4) && <LoadmoreBtn isLoading={isMoreLoading} onClick={() => { setPage((page) => page + 1); setIsMoreLoading(true) }} />}
                            </>
                        )
                    }
                </div>
                <ResultCard />
            </div>
        </>
    )
}

export default searchPage;