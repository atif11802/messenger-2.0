"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { getServerSession } from "next-auth/next";

type Props = {
	session: Awaited<ReturnType<typeof getServerSession>>;
};

const ChatInput = ({ session }: Props) => {
	const [input, setInput] = useState("");
	const {
		data: messages,
		error,
		mutate,
		isLoading,
	} = useSWR("/api/getMessages", fetcher);

	const addMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// send message to server
		if (!input) return;
		const messageTosend = input;
		setInput("");
		const id = uuid();

		if (!session) return;

		const message: Message = {
			id,
			message: messageTosend,
			created_at: Date.now(),
			username: session?.user?.name!,
			profilePic: session?.user?.image!,
			email: session?.user?.email!,
		};

		const uploadMessageToUpstash = async () => {
			const data = await fetch("/api/addMessage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			}).then((res) => res.json());

			return [data.message, ...messages!];
		};

		await mutate(uploadMessageToUpstash, {
			optimisticData: [message, ...messages!],
		});
	};

	return (
		<form
			className='fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 border-t border-gray-100 bg-white'
			onSubmit={addMessage}
		>
			<input
				type='text'
				placeholder='enter message here...'
				disabled={!session}
				className='flex-1 rounded
					border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
					px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed
				'
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button
				type='submit'
				disabled={!input}
				className='
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                    disabled:opacity-50 disabled:cursor-not-allowed
                '
			>
				Send
			</button>
		</form>
	);
};

export default ChatInput;
