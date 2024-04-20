"use client"

import { sendIcon } from "@/utils/font-awesome"
import styles from "./styles.module.scss"
import { Icon } from "@/ui/libs/font-awesome"
import { useEvent, useJustSubscribe, useSubscribe } from "@rx-state-utils/react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Features, state } from "./facade"

export function MessageForm() {
  const [text$, textChangeHandler] = useEvent<FormEvent<HTMLDivElement>, string>(
    (ev) => (ev.target as HTMLDivElement).textContent || ""
  )

  const [text, setText] = useState("")

  const [submit$, submitHandler] = useEvent<FormEvent<HTMLFormElement>, void>((ev) => {
    ev.preventDefault()
  })

  const inputRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let input = inputRef.current
    if (input) {
      input.textContent = text
    }
  }, [text])

  useJustSubscribe(Features.sendMessage(submit$), Features.setMessage(text$))

  useSubscribe(state.asObservable(), (state) => {
    setText(state.messageText)
  })

  return (
    <form className={styles.messageForm} onSubmit={submitHandler}>
      <div
        ref={inputRef}
        contentEditable
        className="input"
        data-placeholder="Type message"
        onInput={textChangeHandler}
      />
      <button type="submit">
        <Icon icon={sendIcon} />
      </button>
    </form>
  )
}
