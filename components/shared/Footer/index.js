// "use client";

import styles from "./footer.module.scss";
import ThemeBtn from "../ThemeBtn";
import GhStarBtn from "../GhStarBtn";

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__text}>
                {/* <p className={styles.location} ><BsGeoAlt /> {location} </p> */}
                <GhStarBtn />
                <p> <span className={styles.logo}>SearchEx</span> is a Free and Open Source project. <br /> You can view its source code on <a href="https://github.com/devxprite/searchex" target="_blank">Github</a> </p>
                <ThemeBtn />
            </div>
        </footer>
    );
}
