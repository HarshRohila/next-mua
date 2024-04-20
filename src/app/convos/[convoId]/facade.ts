import { ConvoMessage } from "@/modules/conversations"
import { UserModel } from "@/modules/user"
import { Observable, defer, forkJoin, map, switchMap, tap } from "@/utils/rx"
import { createState } from "@rx-state-utils/react"
import { getMessages, getUser } from "./server-actions"

interface State {
  messages: ConvoMessage[]
  user: UserModel | undefined
}

const state = createState<State>({
  messages: [],
  user: undefined,
})

const Features = {
  loadData(didRender$: Observable<void>, convoId: string) {
    const messages$ = defer(() => getMessages(convoId))
    const user$ = defer(() => getUser())

    return didRender$.pipe(
      switchMap(() => forkJoin([messages$, user$])),
      map(([messages, user]) => ({
        messages,
        user,
      })),
      tap(({ messages, user }) => {
        state.update({ messages, user })
      })
    )
  },
  sendMessage(message$: Observable<ConvoMessage>) {
    return message$.pipe(
      tap((newMsg) => {
        state.update((currState) => {
          const idx = currState.messages.findIndex(function matchId(msg) {
            return msg.id === newMsg.id
          })

          let newMessages: ConvoMessage[]
          if (idx === -1) {
            newMessages = [newMsg, ...currState.messages]
          } else {
            newMessages = currState.messages.toSpliced(idx, 1, newMsg)
          }

          return { messages: newMessages }
        })
      })
    )
  },
}

export { state, Features }
