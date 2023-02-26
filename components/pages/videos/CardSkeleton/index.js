import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "../VideoCard/videoCard.module.scss"
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const CardSkeleton = () => {

    const { theme } = useContext(ThemeContext);
    const baseColor = theme === "light" ? "#f5f5f5" : "#343434";
    const highlightColor = theme === "light" ? "#e5e5e5" : "#565656";

    return (
        <div>
            <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                <div className={styles.videoCard + ' ' + styles.skeleton}>
                    <Skeleton className={styles.thumbnail} height={160} />
                    <div className={styles.content}>
                        <h2 className={styles.title}><Skeleton /></h2>
                        <p className={styles.publishedAt}><Skeleton /></p>
                        <p className={styles.publishedBy}><Skeleton /></p>
                        <p className={styles.description}><Skeleton /></p>
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default CardSkeleton;
