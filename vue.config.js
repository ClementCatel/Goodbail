module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.module.rules.delete("eslint");
  },
  pwa: {
    workboxOptions: {
			exclude: [/\.map$/, /_redirects/],
		}
  }
};
