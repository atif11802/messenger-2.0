// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
	messages?: Message[];
};

type ErrorData = {
	body: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorData>
) {
	if (req.method !== "GET") {
		res.status(400).json({ body: "Invalid request method" });
		return;
	}

	const messageRes = await redis.hvals("messages");

	const messages: Message[] = messageRes
		.map((message) => JSON.parse(message))
		.sort((a, b) => b.created_at - a.created_at);

	res.status(200).json({ messages });
}
