const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    // createProxyMiddleware('/classhub', {
    //   target: 'https://storage.googleapis.com',
    //   changeOrigin: true,
    // }),
  );
};