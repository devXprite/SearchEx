import styles from '../Card/card.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const CardSkeleton = () => {

    const { theme } = useContext(ThemeContext);
    const baseColor = theme === "dark" ? "#343434" : "#f5f5f5";
    const highlightColor = theme === "dark" ? "#565656" : "#e5e5e5";

    return (
        <div className={styles.card + " " + styles.skeleton}>
            <div className={styles.card__body}>
                <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                    <Skeleton height={200} />
                    <Skeleton height={22} width={'50%'} style={{ margin: '10px 0 5px 0' }} />
                    <Skeleton height={14} count={8} />
                </SkeletonTheme>
            </div>
        </div>
    )
}

export default CardSkeleton;
