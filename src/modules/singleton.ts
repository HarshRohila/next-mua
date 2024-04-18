import { SingletonContainer } from "singleton-injection"
import { ConvoService, FakerConvosService } from "./conversations"

const singletonMap = {
  convoService: () => new FakerConvosService() as ConvoService,
}

export const container = new SingletonContainer(singletonMap)
