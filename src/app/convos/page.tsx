"use server"

import { ConvosFactory } from "@/modules/conversations"
import { lastValueFrom } from "@/utils/rx"

export default async function Conversations() {
	const convos$ = ConvosFactory.get().getConvos()
	const convos = await lastValueFrom(convos$)
	
	return <ul>
		{convos.map(function(c) {
			return <li>{c.name}</li>
		})}
	</ul>
}