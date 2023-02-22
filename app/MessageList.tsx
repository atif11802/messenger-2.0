"use client";
import React, { useEffect } from "react";
import fetcher from "../utils/fetchMessages";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher";
import { Message } from "../typings";

type Props = {
	initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
	const {
		data: messages,
		error,
		mutate,
		isLoading,
	} = useSWR("/api/getMessages", fetcher);

	useEffect(() => {
		var channel = clientPusher.subscribe("messages");

		channel.bind("new-message", async (data: Message) => {
			if (messages?.find((message) => message.id === data.id)) return;

			if (!messages) {
				mutate(fetcher);
			} else {
				await mutate(fetcher, {
					optimisticData: [data, ...messages!],
					rollbackOnError: true,
				});
			}
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [mutate, messages, clientPusher]);

	return (
		<div className='space-y-5 px-5 pt-8 pb-36 max-w-2xl xl:max-w-4xl'>
			{(messages || initialMessages)?.map((message) => (
				<MessageComponent key={message.id} message={message} />
			))}
		</div>
	);
};

export default MessageList;
