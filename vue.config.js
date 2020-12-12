module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  },
  publicPath: process.env.NODE_ENV === "development" ? "/goodbail-dev/" : "",
};
