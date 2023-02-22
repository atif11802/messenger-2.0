/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			"links.papareact.com",
			"i.pravatar.cc",
			"platform-lookaside.fbsbx.com",
		],
	},
	experimental: {
		appDir: true,
	},
};
