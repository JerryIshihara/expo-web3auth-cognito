module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			'babel-preset-expo',
			['@babel/preset-env', {targets: {node: 'current'}}],
			'@babel/preset-typescript',
		  ],
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						src: "./src",
					},
				},
			],
			["module:react-native-dotenv"],
			["react-native-reanimated/plugin"],
			['@babel/plugin-proposal-private-property-in-object', {loose: true}],
		],
	};
};
