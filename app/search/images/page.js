"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import Card from "@/components/pages/images/Card";

const Page = (props) => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/images?q=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false)
            })
    }, [query]);

    useEffect(() => { setResults([]), setLoading(true) }, [query])

    return (
        <>
            <div className={styles.searchPage}>
                <div className={styles.results__container}>
                    {(loading) ? (
                        <h2>Page is Loading...</h2>
                    ) : (
                        <>
                            {results.map(result => (
                                <Card key={result.link} results={result} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page