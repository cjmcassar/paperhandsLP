module.exports = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	target: "serverless",
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback.fs = false;
		}
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: { icon: true },
				},
			],
		});
		return config;
	},
};
