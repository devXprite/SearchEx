'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styles from "./page.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import skeleton 
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
            <div className={styles.account_page}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <SkeletonTheme baseColor="#343434" highlightColor="#565656">
                            <Skeleton width={200} height={200} circle={true} className={styles.userImg} style={{ margin: '0rem 3rem' }} />
                        </SkeletonTheme>
                    </div>
                    <div className={styles.body}>
                        <SkeletonTheme baseColor="#343434" highlightColor="#565656">
                            <Skeleton height={22} width={'50%'} style={{ margin: '10px 0 5px 0' }} />
                            <Skeleton height={14} count={6} width={'100%'} />
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
        )
    }

    const UserEmail = session?.user?.email;
    const UserName = session.user.name || session.user.email.split('@')[0];
    const UserImage = session.user?.image;

    return (
        <div className={styles.account_page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <img src={UserImage} className={styles.userImg} alt="User Image" />
                </div>
                <div className={styles.body}>
                    <h1 className={styles.name}>{UserName}</h1>
                    <p className={styles.email}>{UserEmail}</p>
                    <div className={styles.buttons}>
                        <button onClick={() => router.push('/account/search-history')} >View Search History</button>
                        <button onClick={() => signOut()} className={styles.logout}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
