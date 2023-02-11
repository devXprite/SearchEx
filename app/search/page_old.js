"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ResultsSnippet from "@/components/ResultsSnippet";
import styles from "./page.module.scss";

const searchPage = () => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
            fetch(`/api/search?q=${query}&page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                })
    }, []);

    console.log(results)

    return (
        <>
            <div className={styles.searchPage}>
                <div></div>
                <div className={styles.results__container}>
                    {results.map(result => (
                        <ResultsSnippet key={result.link} results={result} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default searchPage;