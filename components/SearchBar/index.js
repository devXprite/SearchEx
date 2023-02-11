"use client";

import styles from "./style.module.scss"
import { FaSearch } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const SearchBar = (props) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(props.value || "");

    useEffect(() => {
        setSearch(searchParams.get("q") || "");
    }, [pathname]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("searching");
        router.push(`/search?q=${search}`);
    }

    return (
        <form className={styles.searchBar + " " + props.classNames} onSubmit={handleSearch}>
            <input placeholder="Enter A Song, Album, or Artist" value={search } onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" ><FaSearch /></button>
        </form>
    );
}

export default SearchBar;