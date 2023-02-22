import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
	appId: "1557611",
	key: "76a1bb70ccdeedaf4baf",
	secret: "9fe6e73cde79d460f681",
	cluster: "ap2",
	useTLS: true,
});

export const clientPusher = new ClientPusher("76a1bb70ccdeedaf4baf", {
	cluster: "ap2",
	forceTLS: true,
});
