"use server"

import { container } from "@/modules/singleton"
import { Convos } from "@/ui/convo"
import { lastValueFrom } from "@/utils/rx"

export default async function Conversations() {
  const convos$ = container.get("convoService").getConvos()
  const convos = await lastValueFrom(convos$)

  return <Convos convos={convos} />
}
