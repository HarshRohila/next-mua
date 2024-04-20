import { container } from "@/modules/singleton"
import styles from "./styles.module.scss"
import { forkJoin, lastValueFrom, map } from "@/utils/rx"
import { Icon } from "@/ui/libs/font-awesome"
import { sendIcon } from "@/utils/font-awesome"

interface PageProps {
  params: { convoId: string }
}

export default async function Page({ params: { convoId } }: PageProps) {
  const messages$ = container.get("convoService").getMessages(convoId)
  const user$ = container.get("userService").getUser()

  const data$ = forkJoin([messages$, user$]).pipe(
    map(([messages, user]) => ({
      messages,
      user,
    }))
  )

  const { messages, user } = await lastValueFrom(data$)

  return (
    <div className={styles.convoPage}>
      <ul className={styles.messageWindow}>
        {messages.map(function (msg) {
          return (
            <li className={msg.fromUserId === user.id ? "my" : ""} key={msg.id}>
              {msg.message}
            </li>
          )
        })}
      </ul>
      <form className={styles.messageForm}>
        <div contentEditable className="input" />
        <button type="submit">
          <Icon icon={sendIcon} />
        </button>
      </form>
    </div>
  )
}
