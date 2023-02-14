import { BsMoon } from "react-icons/bs";
import styles from "./themeBtn.module.scss";

export default function ThemeBtn() {
    return (
        <p className={styles.theme}><BsMoon /> &nbsp; Dark Theme</p>
    )
}
