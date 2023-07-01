"use client";

import styles from "./style.module.scss"
import { FaSearch } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Autosuggest from 'react-autosuggest';


const fetchSuggestions = async (search, signal) => {

    const res = await fetch(`https://auto-suggest-queries.p.rapidapi.com/suggestqueries?query=${search}`, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST
        },
        signal
    });

    const data = await res.json() || [];
    return data;
}

const renderSuggestion = suggestion => (
    <p>
        <span className={styles.searchIcon}><FaSearch /></span> {suggestion}
    </p>
);

const renderInputComponent = inputProps => {
    delete inputProps.key;
    return (
        <div className={styles.searchBar__container}>
            <input {...inputProps} />
            <button type="submit" className={styles.searchButton}>
                <FaSearch />
            </button>
        </div>
    );
}


const SearchBar = (props) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef();

    const [search, setSearch] = useState(props.value || "");
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
        setSearch(searchParams.get("q") || "");
    }, [pathname]);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        fetchSuggestions(search, signal).then(data => {
            setSuggestions(data);
        }).catch(err => false);

        return () => { controller.abort(); }
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();
        inputRef.current.blur();

        if (pathname === "/") {
            router.push(`/search?q=${search}`);
        } else {
            router.push(`${pathname}?q=${search}`);
        }

        fetch(`/api/history?q=${search}&p=${pathname}&t=${Date.now()}`).catch(err => false);
    }

    const onSuggestionSelected = (e, { suggestion }) => {
        setSearch(suggestion);
        inputRef.current.blur();

        if (pathname === "/") {
            router.push(`/search?q=${suggestion}`);
        } else {
            router.push(`${pathname}?q=${suggestion}`);
        }

    }

    return (
        <form onSubmit={handleSearch}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={() => { }}
                onSuggestionsClearRequested={() => { }}
                renderSuggestion={renderSuggestion}
                getSuggestionValue={suggestion => suggestion}
                onSuggestionSelected={onSuggestionSelected}
                renderInputComponent={renderInputComponent}
                inputProps={{
                    placeholder: 'Start typing to search ...',
                    value: search || "",
                    onChange: (e) => setSearch(e.target.value),
                    ref: inputRef
                }}
                theme={{
                    container: styles.searchBar,
                    containerOpen: styles.searchBar__open,
                    input: styles.input,
                    suggestionsContainer: styles.suggestionsContainer,
                    suggestionsContainerOpen: styles.suggestionsContainer__open,
                    suggestionsList: styles.suggestionsList,
                    suggestion: styles.suggestion,
                    suggestionHighlighted: styles.suggestionHighlighted
                }}
            />
        </form>
    );
}

export default SearchBar;