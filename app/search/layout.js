"use client";

import styles from './layout.module.scss'
import SearchBar from "@/components/SearchBar";
import { BsPerson } from 'react-icons/bs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { BsSearch, BsImage, BsNewspaper } from 'react-icons/bs';


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
            url: '/search/news?q=',
            icon: <BsNewspaper />,
            pathRegex: /^\/search\/news/
        },
        {
            title: 'Shopping',
            url: '/search/news?q=',
            icon: <BsNewspaper />,
            pathRegex: /^\/search\/news/
        }
    ]

    return (
        <div className={styles.search__layout}>
        <div className={styles.header}>
            <div className={styles.container__logo}>
                <img src="/images/logo.svg" alt="logo" className={styles.logo} onClick={() => router.push('/')} />
            </div>
            <div className={styles.container__search}>
                <div className={styles.search}>
                    <SearchBar size="large" />
                </div>
                <div className={styles.menu}>
                    {pages.map(page => (
                        <Link href={page.url + query} key={page.title} className={page.pathRegex.test(usePathname()) ? styles.active : ""}>
                            {page.icon} {page.title}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.container__account}>
                <BsPerson className={styles.account} />
            </div>
        </div>
        <div className={styles.container__content}>
            {children}
        </div>
    </div>
    )
}