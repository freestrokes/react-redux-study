const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		createProxyMiddleware(
			['/users'],
			{
				target: process.env.REACT_APP_API_URL,
				changeOrigin: true,
				router: {}
			}
		)
	);
}
