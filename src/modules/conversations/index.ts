import { MOCK_USER_ID } from "@/utils/constants"
import { PersonFaker, StringFaker, ImageFaker, TextFaker, DateFaker } from "@/utils/faker"
import { Observable, map, of, tap, timer } from "@/utils/rx"

interface Convo {
  id: string
  name: string
  avatar: string
}

interface ConvoService {
  getConvos(): Observable<Convo[]>
  getMessages(convoId: string): Observable<ConvoMessage[]>
  sendMessage(msg: ConvoMessage): Observable<ConvoMessage>
}

enum MessageStatus {
  Unsent = "Unsent",
  Sent = "Sent",
}

interface ConvoMessage {
  id: string
  message: string
  fromUserId: string
  timestamp: Date
  status: MessageStatus
}

class FakerConvosService implements ConvoService {
  sendMessage(msg: ConvoMessage): Observable<ConvoMessage> {
    return timer(300).pipe(
      tap(() => {
        this.messages.push(msg)
      }),
      map(function markSent() {
        return { ...msg, status: MessageStatus.Sent } as ConvoMessage
      })
    )
  }

  private messages: ConvoMessage[] = []

  getConvos(): Observable<Convo[]> {
    return of(
      Array.from({ length: 5 }).map(() => ({
        id: StringFaker.uuid(),
        name: PersonFaker.fullName(),
        avatar: ImageFaker.avatar(),
      }))
    )
  }
  getMessages(convoId: string): Observable<ConvoMessage[]> {
    const messages = Array.from({ length: 50 }).map(function () {
      return {
        id: StringFaker.uuid(),
        message: TextFaker.sentences({ min: 1, max: 2 }),
        fromUserId: Math.random() < 0.5 ? StringFaker.uuid() : MOCK_USER_ID,
        timestamp: DateFaker.recent({ days: 10 }),
        status: MessageStatus.Sent,
      }
    })

    messages.sort(function (a, b) {
      return b.timestamp.getTime() - a.timestamp.getTime()
    })

    this.messages = messages

    return of(messages)
  }
}

export { FakerConvosService, MessageStatus }
export type { Convo, ConvoService, ConvoMessage }
