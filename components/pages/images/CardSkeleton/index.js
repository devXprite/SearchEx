import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const CardSkeleton = () => {

    const { theme } = useContext(ThemeContext);
    const baseColor = theme === "light" ? "#f5f5f5" : "#343434";
    const highlightColor = theme === "light" ? "#e5e5e5" : "#565656";

    return (
        <div>
            <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                <Skeleton height={160} />
                <Skeleton height={16} width={'65%'} style={{ margin: '6px 0 4px 0' }} />
                <Skeleton height={12} count={2} />
            </SkeletonTheme>
        </div>
    )
}

export default CardSkeleton;
