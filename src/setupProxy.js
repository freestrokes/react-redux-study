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


const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		createProxyMiddleware(
			['/test', '/users'],
			{
				target: process.env.REACT_APP_API_URL,
				changeOrigin: true,
				router: {
					'/test': process.env.REACT_APP_API_URL,
					'/users': process.env.REACT_APP_API_URL,
				},
				pathRewrite: {
					'^/test': '',
				}
			}
		)
	);
}
