const PROXY_CONFIG = {
  "/api/v1/*": {
    target: "https://crudcrud.com/api/aee29a336cf449f5a394c3b14a8e0c26",
    pathRewrite: { "^/api/v1": "" },
    secure: false,
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
