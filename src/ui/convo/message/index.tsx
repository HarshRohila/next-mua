import { ConvoMessage } from "@/modules/conversations"
import styles from "./styles.module.scss"
import { Icon } from "@/ui/libs/font-awesome"
import { doubleTickIcon } from "@/utils/font-awesome"

interface MessageProp {
  message: ConvoMessage
}

export function Message({ message }: MessageProp) {
  return (
    <div className={styles.message}>
      <span className="text">{message.message}</span>
      <span className="meta">
        <span className="time">{message.timestamp.toLocaleString()}</span>
        <span className="status">
          <Icon icon={doubleTickIcon} />
        </span>
      </span>
    </div>
  )
}
