import { SingletonContainer } from "singleton-injection"
import { ConvoService, FakerConvosService } from "./conversations"
import { FakerUserService, UserService } from "./user"

const singletonMap = {
  convoService: () => new FakerConvosService() as ConvoService,
  userService: () => new FakerUserService() as UserService,
}

export const container = new SingletonContainer(singletonMap)
