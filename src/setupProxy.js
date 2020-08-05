const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
    app.use('/api',createProxyMiddleware({target: "https://webproject-ui.herokuapp.com/" }));
  };

// module.exports = function(app) {
//   app.use(
//     proxy(["/api", , "/otherApi"], { target: "https://webproject-ui.herokuapp.com/" })
//   );
// };