"use client"

import styles from "./styles.module.scss"
import { Message } from "@/ui/convo/message"
import { MessageForm } from "@/ui/convo/message/form/message-form"
import { useEffect, useState } from "react"
import { ConvoMessage } from "@/modules/conversations"
import { UserModel } from "@/modules/user"
import { useJustSubscribe, useSubscribe, useVoidEvent } from "@rx-state-utils/react"
import { Features, state } from "./facade"

interface PageProps {
  params: { convoId: string }
}

export default function Page({ params: { convoId } }: PageProps) {
  const [messages, setMessages] = useState<ConvoMessage[]>([])
  const [user, setUser] = useState<UserModel>()

  const [didRender$, didRender] = useVoidEvent<void>()

  useJustSubscribe(Features.loadData(didRender$, convoId))

  useSubscribe(state.asObservable(), (data) => {
    setMessages(data.messages)
    setUser(data.user)
  })

  useEffect(() => {
    didRender()
  }, [])

  return (
    <div className={styles.convoPage}>
      <ul className={styles.messageWindow}>
        {messages.map(function (msg) {
          return (
            <li className={msg.fromUserId === user!.id ? "my" : ""} key={msg.id}>
              <Message message={msg} />
            </li>
          )
        })}
      </ul>
      <MessageForm />
    </div>
  )
}
