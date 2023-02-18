import { BsMoon, BsSun } from "react-icons/bs";
import styles from "./themeBtn.module.scss";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export default function ThemeBtn() {
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <div onClick={toggleTheme}>
            <p className={styles.theme}>
                {theme === "light" ? <BsMoon /> : <BsSun />} &nbsp; {theme === "light" ? "Dark" : "Light"} Theme
            </p>
        </div>
    )
}
