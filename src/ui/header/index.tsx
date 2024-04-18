import Link from "next/link"
import styles from "./styles.module.scss"

export default function Header() {
  return (
    <Link href="/">
      <h1 className={styles.header}>Next MUA</h1>
    </Link>
  )
}
