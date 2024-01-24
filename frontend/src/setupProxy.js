const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/classhub/data/udemy/htmlFiles', {
      target: 'https://storage.cloud.google.com',
      changeOrigin: true,
    }),

    createProxyMiddleware('/communities', {
      target: 'http://i10a810.p.ssafy.io:4000',
      changeOrigin: true,
    }),
  );
};