import styles from "./footer.module.scss";
import Link from "next/link";

// import noon icon for dark theme from react-icons
import { BsMoon } from "react-icons/bs";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__text}>
                <p> <span className={styles.logo}>Apubmed</span> © Copyright 2023 Apubmed. All rights reserved.</p>
                <p className={styles.theme}><BsMoon /> &nbsp; Dark Theme</p>
            </div>
            {/* <div className={styles.footer__links}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/View Source">View Source</Link>
            </div> */}
        </footer>
    );
}
