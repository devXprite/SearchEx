"use client"

import CardSkeleton from "@/components/pages/videos/CardSkeleton";
import VideoCard from "@/components/pages/videos/VideoCard";
import LoadmoreBtn from "@/components/shared/LoadmoreBtn";
import NoResults from "@/components/shared/NoResults";
import axios from "axios";
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
        axios.get(`/api/search/news?q=${query}&page=${page}`)
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

    if(!results.length) {
        return (
            <div>
                <div>
                    <NoResults query={query} type="news" />
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