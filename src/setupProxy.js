const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		createProxyMiddleware(
			[
				'/users',
				'/posts',
				'/test'
			],
			{
				target: process.env.REACT_APP_API_ENDPOINT,
				changeOrigin: true,
				router: {
					'/users': process.env.REACT_APP_API_ENDPOINT,
					'/posts': process.env.REACT_APP_API_ENDPOINT,
					'/test': process.env.REACT_APP_API_ENDPOINT,
				},
				pathRewrite: {
					'^/test': '',
				}
			}
		)
	);
}
