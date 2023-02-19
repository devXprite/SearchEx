import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const ResultSkeleton = () => {

    const { theme } = useContext(ThemeContext);
    const baseColor = theme === "dark" ? "#343434" : "#f5f5f5";
    const highlightColor = theme === "dark" ? "#565656" : "#e5e5e5";

    return (
        <SkeletonTheme count={9} baseColor={baseColor} highlightColor={highlightColor}>
            <br />
            <p style={{ width: '40%' }}>{<Skeleton height={14} />}</p>
            <h1>{<Skeleton />}</h1>
            <p>{<Skeleton />}</p>
            <p>{<Skeleton />}</p>
        </SkeletonTheme>
    )
}

export default ResultSkeleton; 