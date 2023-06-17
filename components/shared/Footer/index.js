"use client";

import styles from "./footer.module.scss";
import ThemeBtn from "../ThemeBtn";
import { BsGeoAlt } from "react-icons/bs";
import { useEffect, useState } from "react";

const currentLocation = async () => {
    try {
        const response = await fetch("https://ipinfo.io/json?token=57cb832fc1de92");
        const data = await response.json();
        const location = `${data.city}, ${data.region}, ${data.country}`;
        return location;
    } catch (err) {
        return false;
    }
}

export default function Footer() {

    const [location, setLocation] = useState("");
    useEffect(() => { currentLocation().then(location => { setLocation(location) }) }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__text}>
                <p className={styles.location} ><BsGeoAlt /> {location} </p>
                <p> <span className={styles.logo}>SearchEx</span> is a Free and Open Source project. <br /> You can view its source code on <a href="https://github.com/devxprite/searchex" target="_blank">Github</a> </p>
                <ThemeBtn />
            </div>
        </footer>
    );
}
