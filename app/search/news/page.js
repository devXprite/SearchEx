"use client"

import CardSkeleton from "@/components/pages/videos/CardSkeleton";
import VideoCard from "@/components/pages/videos/VideoCard";
import LoadmoreBtn from "@/components/shared/LoadmoreBtn";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Page = (props) => {

    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
        fetch(`/api/search/news?q=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setResults((results) => [...results, ...data || []]);
                setLoading(false);
                setIsMoreLoading(false);
            })
    }, [query, page])

    useEffect(() => { setResults([]), setLoading(true) }, [query])

    if (loading) {
        return (
            <div>
                <div>
                    {Array.from(Array(15).keys()).map((i) => <CardSkeleton key={i} />)}
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                <div>
                    <>
                        {results.map((result, i) => (
                            <VideoCard key={result.i} results={result} />
                        ))}
                    </>
                </div>
                {(page < 5) && <LoadmoreBtn isLoading={isMoreLoading} onClick={() => {setPage((page) => page + 1); setIsMoreLoading(true)}} />}
            </div>
        </>
    )
}

export default Page