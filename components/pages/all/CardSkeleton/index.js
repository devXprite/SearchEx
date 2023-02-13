import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '../Card/card.module.scss'

const CardSkeleton = () => {
    return (
        <div className={styles.card + " " + styles.skeleton}>
            <div className={styles.card__body}>
                <SkeletonTheme baseColor="#343434" highlightColor="#565656">
                    <Skeleton height={200} />
                    <Skeleton height={22} width={'50%'} style={{ margin: '10px 0 5px 0' }} />
                    <Skeleton height={14} count={8} />
                </SkeletonTheme>
            </div>
        </div>
    )
}

export default CardSkeleton;
