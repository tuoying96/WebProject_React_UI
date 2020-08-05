const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
    app.use('/main', createProxyMiddleware({target: "https://webproject-ui.herokuapp.com", changeOrigin:true
 }));
  };

// module.exports = function(app) {
//   app.use(
//     proxy(["/api", , "/otherApi"], { target: "https://webproject-ui.herokuapp.com/" })
//   );
// };