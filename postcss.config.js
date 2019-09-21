module.exports = {
	// parser: 'sugarss',
	plugins: {
		// 'postcss-import': {},
		// 'postcss-preset-env': {},
		autoprefixer: {},
		'css-mqpacker': {},
		cssnano: {
			preset: [
				'default', {
					discardComments: {
						removeAll: true,
					},
				},
			],
		},
	},
};
