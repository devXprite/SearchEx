import AccountBtn from '@/components/shared/AccountBtn'
import SearchBar from '@/components/shared/SearchBar'
import Image from 'next/image'
import styles from './page.module.scss'


export default function Home() {
  return (
    <>
      <div className={styles.accountBtn_container}>
        <AccountBtn />
      </div>
      <h1 className={styles.logo}>WebProwlr</h1>
      <p className={styles.tagline}>Empowering your search with AI</p>
      <SearchBar />
    </>
  )
}
