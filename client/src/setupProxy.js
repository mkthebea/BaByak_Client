const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://35.78.73.14:8000",
      changeOrigin: true,
    })
  );
};
