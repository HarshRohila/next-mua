import { PersonFaker, StringFaker, ImageFaker } from "@/utils/faker"
import { Observable, of } from "@/utils/rx"

interface Convo {
  id: string
  name: string
  avatar: string
}

interface ConvoService {
  getConvos(): Observable<Convo[]>
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
}

const ConvosFactory = {
  get(): ConvoService {
    return new FakerConvosService()
  },
}

export { ConvosFactory, FakerConvosService }
export type { Convo, ConvoService }
