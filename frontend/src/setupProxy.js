const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/classhub/data/udemy/htmlFiles/1.html?authuser=2', {
      target: 'https://storage.cloud.google.com',
      changeOrigin: true,
    }),
  );
};