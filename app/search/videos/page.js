"use client"

import CardSkeleton from "@/components/pages/videos/CardSkeleton";
import VideoCard from "@/components/pages/videos/VideoCard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import NoResults from "@/components/shared/NoResults";
import LoadmoreBtn from "@/components/shared/LoadmoreBtn";

const Page = (props) => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState("");
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState("");
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/search/videos?q=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setResults((results) => [...results, ...data?.items || []]);
                setNextPageToken(data?.pageInfo?.nextPageToken || "");
            })
    }, [query, page]);

    useEffect(() => { setResults([]), setLoading(true) }, [query])

    if (error) {
        return (
            <>
                <div className={styles.videos__page}>
                    <div className={styles.results__container}>
                        <h2> Internal Server Error </h2>
                    </div>
                </div>
            </>
        )
    }

    if (loading) {
        return (
            <>
                <div className={styles.videos__page}>
                    <div className={styles.results__container}>
                        <>{Array.from(Array(10).keys()).map((i) => <CardSkeleton key={i} />)}</>
                    </div>
                </div>
            </>
        )
    }

    if (!results.length) {
        return (
            <div className={styles.videos__page}>
                <NoResults query={query} type="videos" />
            </div>
        )
    }

    return (
        <>
            <div className={styles.videos__page}>
                <div className={styles.results__container}>
                    <>
                        {results.map((result, i) => (
                            <VideoCard key={result.i} results={result} />
                        ))}
                    </>
                </div>
                <LoadmoreBtn isLoading={isMoreLoading} onClick={() => {setPage(nextPageToken); setIsMoreLoading(true); }} />
            </div>
        </>
    )
}

export default Page