"use client";

import styles from "./footer.module.scss";
import ThemeBtn from "../ThemeBtn";

// import location icon from react-icons
import { BsGeoAlt } from "react-icons/bs";
import { useEffect, useState } from "react";

const currentLocation = async () =>{
    const response = await fetch("https://ipinfo.io/json?token=57cb832fc1de92");
    const data = await response.json();
    const location = `${data.city}, ${data.region}, ${data.country}`;
    return location;
}

export default function Footer() {

    const [location, setLocation] = useState("");

    useEffect(() => {
        currentLocation().then((location) => {
            setLocation(location);
        });
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__text}>
                <p className={styles.location} ><BsGeoAlt /> {location} </p>
                <p> <span className={styles.logo}>WebProwlr</span> is a Free and Open Source project. <br /> You can view its source code on <a href="https://github.com/" target="_blank">Github</a> </p>
                <ThemeBtn />
            </div>
            {/* <div className={styles.footer__links}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/View Source">View Source</Link>
            </div> */}
        </footer>
    );
}
