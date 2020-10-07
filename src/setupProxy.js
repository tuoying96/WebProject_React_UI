require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', // rewrite path
      },
    })
  );
};