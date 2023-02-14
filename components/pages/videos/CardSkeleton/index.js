import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "../VideoCard/videoCard.module.scss"

const CardSkeleton = () => {
    return (
        <div>
            <SkeletonTheme baseColor="#343434" highlightColor="#565656">
                <div className={styles.videoCard + ' ' + styles.skeleton}>
                    <Skeleton className={styles.thumbnail} height={160} />
                    <div className={styles.content}>
                        <h2 className={styles.title}><Skeleton /></h2>
                        <p className={styles.publishedAt}><Skeleton /></p>
                        <p className={styles.channel}><Skeleton /></p>
                        <p className={styles.description}><Skeleton /></p>
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default CardSkeleton;
