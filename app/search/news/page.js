"use client"

import CardSkeleton from "@/components/pages/videos/CardSkeleton";
import VideoCard from "@/components/pages/videos/VideoCard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Page = (props) => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/search/news?q=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false)
            })
    }, [query]);

    useEffect(() => { setResults([]), setLoading(true) }, [query])

    return (
        <>
            <div>
                <div>
                    {(loading) ? (
                       <>{Array.from(Array(15).keys()).map((i) => <CardSkeleton key={i} /> ) }</>
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