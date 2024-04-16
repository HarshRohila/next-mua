import { PersonFaker, StringFaker } from "@/utils/faker"
import { Observable, of } from "@/utils/rx"

interface Convo {
	id: string
	name: string
}

interface ConvoService {
	getConvos(): Observable<Convo[]>
}

class FakerConvosService implements ConvoService {
	getConvos(): Observable<Convo[]> {
		return of(Array.from({length: 5}).map(() => ({
			id: StringFaker.uuid(),
			name: PersonFaker.fullName()
		})))
	}
}

const ConvosFactory = {
	get(): ConvoService {
		return new FakerConvosService()
	}
}

export { ConvosFactory }