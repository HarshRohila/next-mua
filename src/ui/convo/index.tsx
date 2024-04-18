import Image from "next/image"
import styles from "./styles.module.scss"
import { Convo as ConvoModel } from "@/modules/conversations"

interface ConvoProps {
  convo: ConvoModel
}

export function Convo({ convo }: ConvoProps) {
  const avartDim = 48

  return (
    <div className={styles.card}>
      <Image src={convo.avatar} alt={`${convo.name}'s avatar`} width={avartDim} height={avartDim}></Image>
      <span className="name">{convo.name}</span>
    </div>
  )
}

export * from "./list"
