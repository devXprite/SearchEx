import AccountBtn from '@/components/shared/AccountBtn'
import SearchBar from '@/components/shared/SearchBar'
import styles from './page.module.scss'

export default function Home() {
  return (
    <>
      <div className={styles.accountBtn_container}>
        <AccountBtn />
      </div>
      {/* <h1 className={styles.logo}>SearchEx</h1> */}
      <img src="/logo.png" className={styles.logo} alt="" />
      <p className={styles.tagline}>Effortlessly explore the Web</p>
      <SearchBar />
    </>
  )
}
