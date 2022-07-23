const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware(
      [
        "**",
        "!/ascension-setup-script",
        "!/ascension-setup-script/index.html",
        "!/ascension-setup-script/static/js/bundle.js",
        "!/ascension-setup-script/favicon.ico",
        "!/ascension-setup-script/manifest.json",
        "!/ascension-setup-script/logo*.png",
        "!**/*.hot-update.json",
        "!**/*.hot-update.js",
        "!**/*.js.map",
      ],
      {
        target: "http://127.0.0.1:60080",
        changeOrigin: true,
        secure: false,
      }
    )
  );
};
