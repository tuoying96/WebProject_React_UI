// const {createProxyMiddleware} = require("http-proxy-middleware");

// module.exports = app => {
//     app.use('/api', createProxyMiddleware({target: "https://webproject-ui.herokuapp.com/login"
//  }));
// };

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://webproject-ui.herokuapp.com',
      changeOrigin: true,
    })
  );
};