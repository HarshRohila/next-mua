"use server"

import { ConvoMessage } from "@/modules/conversations"
import { container } from "@/modules/singleton"
import { lastValueFrom } from "@/utils/rx"

export async function sendMessage(msg: ConvoMessage) {
  return lastValueFrom(container.get("convoService").sendMessage(msg))
}
