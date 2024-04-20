import { Features as ConvoFeatures } from "@/app/convos/[convoId]/facade"
import { ConvoMessage, MessageStatus } from "@/modules/conversations"
import { MOCK_USER_ID } from "@/utils/constants"
import { Observable, concat, defer, map, of, switchMap, tap } from "@/utils/rx"
import { UUID } from "@/utils/uuid"
import { createState } from "@rx-state-utils/react"
import { sendMessage } from "./server-actions"

interface State {
  messageText: string
}

const state = createState<State>({
  messageText: "",
})

const Features = {
  setMessage(changeMessage$: Observable<string>) {
    return changeMessage$.pipe(
      tap((msg) => {
        state.update({ messageText: msg })
      })
    )
  },
  sendMessage(submit$: Observable<void>) {
    const sendMsg = (msg: ConvoMessage) => defer(() => sendMessage(msg))

    const createMsg$ = submit$.pipe(
      map(() => createMessage({ message: state.get().messageText })),
      switchMap((newMsg) => {
        return concat(
          of(newMsg).pipe(
            tap(() => {
              state.update({ messageText: "" })
            })
          ),
          sendMsg(newMsg)
        )
      })
    )

    return ConvoFeatures.sendMessage(createMsg$)
  },
}

function createMessage(props: Partial<ConvoMessage>): ConvoMessage {
  return {
    fromUserId: MOCK_USER_ID,
    id: UUID.get(),
    timestamp: new Date(),
    status: MessageStatus.Unsent,
    ...props,
  } as ConvoMessage
}

export { state, Features }
