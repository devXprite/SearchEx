"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ResultsSnippet from "@/components/pages/all/Snippet";
import styles from "./page.module.scss";
import ResultSkeleton from "@/components/pages/all/SnippetSkeleton";
import ResultCard from "@/components/pages/all/Card";

const searchPage = () => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            fetch(`/api/search?q=${query}&page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    setLoading(false)
                })
    }, [query]);

    useEffect(() =>{setResults([]), setLoading(true)},[query])

    console.log(results)

    return (
        <>
            <div className={styles.searchPage}>
                <div className={styles.results__container}>
                   {
                    (loading) ? (
                        <>
                            {Array.from(Array(10).keys()).map((i) => <ResultSkeleton key={i} />) }
                        </>
                    ) : (
                        <>
                            {results.map(result => (
                                <ResultsSnippet key={result.link} results={result} />
                            ))}
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