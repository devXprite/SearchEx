import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import styles from './page.module.scss'


export default function Home() {
  return (
    <>
      <h1 className={styles.logo}>BrainWave</h1>
      <p className={styles.tagline}>Empowering your search with AI</p>
      <SearchBar />
    </>
  )
}
