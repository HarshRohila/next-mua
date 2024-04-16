import styles from "./styles.module.scss"
import { Convo as ConvoModel } from "@/modules/conversations"

interface ConvoProps {
  convo: ConvoModel
}

export default function Convo({ convo }: ConvoProps) {
  return (
    <div className={styles.card}>
      <span>{convo.name}</span>
    </div>
  )
}
