'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styles from "./style.module.scss"
import { FaUser } from "react-icons/fa"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountBtn() {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
            <div className={styles.accountBtn}>
                <FaUser />
                <p className={styles.title}>Loading...</p>
            </div>
        )
    }

    if (session && session.user) {
        const UserName = session.user.name || session.user.email.split('@')[0];

        return (
            <div className={styles.accountBtn} onClick={() => router.push('/account')}>
                <img src={session.user.image} alt="user" />
                <p className={styles.title}>{UserName}</p>
            </div>
        )
    }

    return (
        <div className={styles.accountBtn} onClick={() => signIn()}>
            <FaUser />
            <p className={styles.title}>Login</p>
        </div>
    )
}