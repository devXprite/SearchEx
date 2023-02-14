"use client";

import styles from './layout.module.scss'
import SearchBar from "@/components/shared/SearchBar";
import { BsPerson } from 'react-icons/bs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { BsSearch, BsImage, BsNewspaper } from 'react-icons/bs';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { BsBook, BsMap } from 'react-icons/bs';
import { Suspense } from 'react';
import AccountBtn from '@/components/shared/AccountBtn';

export default function SearchLayout({ children }) {
    const router = useRouter();
    const query = useSearchParams().get('q') || '';

    const pages = [
        {
            title: 'All',
            url: '/search?q=',
            icon: <BsSearch />,
            pathRegex: /^\/search$/
        },
        {
            title: 'Videos',
            url: '/search/videos?q=',
            icon: <BsFillCameraVideoFill />,
            pathRegex: /^\/search\/videos/
        },
        {
            title: 'Images',
            url: '/search/images?q=',
            icon: <BsImage />,
            pathRegex: /^\/search\/images/
        },
        {
            title: 'News',
            url: '/search/news?q=',
            icon: <BsNewspaper />,
            pathRegex: /^\/search\/news/
        },
        {
            title: 'Maps',
            url: 'https://www.google.com/maps/search/',
            icon: <BsMap />,
            pathRegex: /^\/search\/maps/
        },
        // {
        //     title: 'Books',
        //     url: '/search/books?q=',
        //     icon: <BsBook />,
        //     pathRegex: /^\/search\/books/
        // },
    ]

    return (
        <Suspense>
            <div className={styles.search__layout}>
                <div className={styles.header}>
                    <div className={styles.container__logo}>
                    <Link href={'/'}><span className={styles.logo}>Apubmed</span> </Link>
                    </div>
                    <div className={styles.container__search}>
                        <div className={styles.search}>
                            <SearchBar size="large" />
                        </div>
                        <div className={styles.menu}>
                            {pages.map(page => (
                                <Link href={page.url + query} key={page.title} className={page.pathRegex.test(usePathname()) ? styles.active : ""}>
                                    <span>{page.icon}</span><span>{page.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={styles.container__account}>
                        {/* <BsPerson className={styles.account} /> */}
                        <AccountBtn />
                    </div>
                </div>
                <div className={styles.container__content}>
                    {children}
                </div>
            </div>
        </Suspense>
    )
}