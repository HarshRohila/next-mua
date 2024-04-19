import { MOCK_USER_ID } from "@/utils/constants"
import { PersonFaker, StringFaker, ImageFaker, TextFaker } from "@/utils/faker"
import { Observable, of } from "@/utils/rx"

interface Convo {
  id: string
  name: string
  avatar: string
}

interface ConvoService {
  getConvos(): Observable<Convo[]>
  getMessages(convoId: string): Observable<ConvoMessage[]>
}

interface ConvoMessage {
  id: string
  message: string
  fromUserId: string
}

class FakerConvosService implements ConvoService {
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
    return of(
      Array.from({ length: 50 }).map(function () {
        return {
          id: StringFaker.uuid(),
          message: TextFaker.sentences({ min: 1, max: 2 }),
          fromUserId: Math.random() < 0.5 ? StringFaker.uuid() : MOCK_USER_ID,
        }
      })
    )
  }
}

export { FakerConvosService }
export type { Convo, ConvoService }
