const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		createProxyMiddleware(
			['/posts', '/test'],
			{
				target: process.env.REACT_APP_API_ENDPOINT,
				changeOrigin: true,
				router: {
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
