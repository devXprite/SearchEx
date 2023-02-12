import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ResultSkeleton = () => {
    return (
        <SkeletonTheme 
               count={9}
                baseColor="#444" 
                highlightColor="#888"
            >
               <br/>                

               <p style={{width: '40%' }}>{<Skeleton height={14} />}</p>
               <h1>{<Skeleton />}</h1>
               <p>{<Skeleton />}</p>
               <p>{<Skeleton />}</p>
        </SkeletonTheme>
    )
}

export default ResultSkeleton; 