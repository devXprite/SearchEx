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

        // if path is / then push to /search else just ?q= to the current path
        if (pathname === "/") {
            router.push(`/search?q=${search}`);
        } else {
            router.push(`${pathname}?q=${search}`);
        }
    }

    return (
        <form className={styles.searchBar + " " + props.classNames} onSubmit={handleSearch}>
            <input placeholder="Write here to search..." value={search } onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" ><FaSearch /></button>
        </form>
    );
}

export default SearchBar;