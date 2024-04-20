"use server"

import { container } from "@/modules/singleton"
import { lastValueFrom } from "rxjs"

export async function getMessages(convoId: string) {
  return lastValueFrom(container.get("convoService").getMessages(convoId))
}

export async function getUser() {
  return lastValueFrom(container.get("userService").getUser())
}
