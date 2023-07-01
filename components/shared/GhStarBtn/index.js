"use client";

import { useEffect, useState } from "react";
import styles from "./ghStarBtn.module.scss";
import { FaStar } from "react-icons/fa";
import axios from "axios";


const GhStarBtn = async () => {
    const [starCount, setStarCount] = useState('--');

    useEffect(() => {
        axios.get("https://api.github.com/repos/devxprite/infoooze")
            .then(res => {setStarCount(res.data.stargazers_count)})
            .catch(err => { console.log(err); })
    }, []);
    

    return (
        <a href="https://github.com/devxprite/searchex" target="_blank" className={styles.ghStarBtn}>
            <span>
                <FaStar /> &nbsp; Star Us
            </span>
            <span>{starCount}</span>
        </a>
    );
}

export default GhStarBtn;