import { ConvoMessage } from "@/modules/conversations"
import { container } from "@/modules/singleton"
import { UserModel } from "@/modules/user"
import { Observable, forkJoin, map, switchMap, tap } from "@/utils/rx"
import { createState } from "@rx-state-utils/react"

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
    const messages$ = container.get("convoService").getMessages(convoId)
    const user$ = container.get("userService").getUser()

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
      tap((msg) => {
        state.update((currState) => {
          return { messages: [msg, ...currState.messages] }
        })
      })
    )
  },
}

export { state, Features }
