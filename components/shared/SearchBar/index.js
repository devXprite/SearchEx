"use client";

import styles from "./style.module.scss"
import { FaSearch } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';


const fetchSuggestions = async (search, signal) => {

    const res = await fetch(`https://auto-suggest-queries.p.rapidapi.com/suggestqueries?query=${search}`, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "f5e19d4c9emsh03eea66f6e3de51p132ee2jsn33a0e19fc0a9",
            "X-RapidAPI-Host": "auto-suggest-queries.p.rapidapi.com"
        },
        signal
    });

    const data = await res.json() || [];
    return data;
}

const renderSuggestion = suggestion => (
    <p onClick={() => console.log("clicked")}>
        <span className={styles.searchIcon}><FaSearch /></span> {suggestion}
    </p>
);

const renderInputComponent = inputProps => (
    <div className={styles.searchBar__container}>
        <input {...inputProps} />
        <button type="submit" className={styles.searchButton}>
            <FaSearch />
        </button>
    </div>
);


const SearchBar = (props) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("q");

    const [search, setSearch] = useState(props.value || "");
    const [suggestions, setSuggestions] = useState([
        "World Cup",
        "Elon Musk",
        "Facebook",
        "Artificial Intelligence",
        "Narendra Modi",
    ]);


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
        e.target.blur();

        console.log("searching");
        fetch(`/api/history?q=${search}&p=${pathname}&t=${Date.now()}`).catch(err => false);

        if (pathname === "/") {
            router.push(`/search?q=${search}`);
        } else {
            router.push(`${pathname}?q=${search}`);
        }
    }

    const onSuggestionSelected = (e, { suggestion }) => {
        console.log("selected", suggestion);
        setSearch(suggestion);
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
                    onChange: (e) => setSearch(e.target.value)
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