import { Features as ConvoFeatures } from "@/app/convos/[convoId]/facade"
import { MOCK_USER_ID } from "@/utils/constants"
import { Observable, map, tap } from "@/utils/rx"
import { UUID } from "@/utils/uuid"
import { createState } from "@rx-state-utils/react"

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
    return ConvoFeatures.sendMessage(
      submit$.pipe(
        map(() => ({
          fromUserId: MOCK_USER_ID,
          id: UUID.get(),
          message: state.get().messageText,
          timestamp: new Date(),
        }))
      )
    ).pipe(
      tap(() => {
        state.update({ messageText: "" })
      })
    )
  },
}

export { state, Features }
