import { Convo as ConvoModel } from "@/modules/conversations"
import styles from "./styles.module.scss"
import { Convo } from ".."
import Link from "next/link"

interface ConvosProps {
  convos: ConvoModel[]
}

export function Convos({ convos }: ConvosProps) {
  return (
    <ul className={styles.convos}>
      {convos.map(function (c) {
        return (
          <li key={c.id}>
            <Link href={`/convos/${c.id}`}>
              <Convo convo={c} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
