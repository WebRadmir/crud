const PROXY_CONFIG = {
  "/api/v1/*": {
    target: "https://crudcrud.com/api/3135f8f3a0584be28e97f9dd31d399d2",
    pathRewrite: { "^/api/v1": "" },
    secure: false,
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
