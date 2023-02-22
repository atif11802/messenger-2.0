import { useSession } from "next-auth/react";
import Image from "next/image";
import { Message } from "../typings";

interface MessageComponentProps {
	message: Message;
}
// 1 hr 39 min

const MessageComponent = ({ message }: MessageComponentProps) => {
	const { data: session } = useSession();
	const isUser = session?.user?.email === message.email;
	// 1.49
	return (
		<div className={`flex w-fit items-center ${isUser && "ml-auto"}`}>
			<div className={`flex-shrink-0 ${isUser && "order-2"}`}>
				<Image
					width={50}
					height={10}
					src={message.profilePic}
					alt='profile pic'
					className='rounded-full mx-2'
				/>
			</div>
			<div>
				<p
					className={`text-[0.65rem] px-[2px] pv-[2px]  ${
						isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
					}`}
				>
					{message.username}
				</p>
				<div className='flex item-end'>
					<div
						className={`px-3 py-2 rounded-lg w-fit text-white ${
							isUser ? "bg-blue-400 ml-auto order-2" : " bg-red-400 "
						}`}
					>
						<p>{message.message}</p>
					</div>
					<p
						className={`text-[0.65rem] italic px-2 text-gray-500 ${
							isUser && "text-right"
						}`}
					>
						{new Date(message.created_at).toTimeString()}{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default MessageComponent;
