"use client"

import VideoCard from "@/components/pages/videos/VideoCard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";

const Page = (props) => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/search/videos?q=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setResults(data.videos);
                setLoading(false)
            })
    }, [query]);

    useEffect(() => { setResults([]), setLoading(true) }, [query])

    return (
        <>
            <div className={styles.videos__page}>
                <div className={styles.results__container}>
                    {(loading) ? (
                    //    <>{Array.from(Array(15).keys()).map((i) => <CardSkeleton key={i} /> ) }</>
                    <h2>loading videos results...</h2>
                    ) : (
                        <>
                            {results.map((result, i) => (
                                <VideoCard key={result.i} results={result} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page