import styles from "./style.module.scss"

import { FaUser } from "react-icons/fa"

export default function AccountBtn() {
    return (
        <div className={styles.accountBtn}>
                <FaUser />
                {/* <img src="/logo.png" /> */}
            <p className={styles.title}>Login</p>
        </div>
    )
}