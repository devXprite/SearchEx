import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
    return (
        <div>
            <SkeletonTheme baseColor="#343434" highlightColor="#565656">
                <Skeleton height={160} />
                <Skeleton height={16} width={'65%'} style={{ margin: '6px 0 4px 0' }} />
                <Skeleton height={12} count={2} />
            </SkeletonTheme>
        </div>
    )
}

export default CardSkeleton;
