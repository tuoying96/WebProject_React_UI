const {injectBabelPlugin, getLoader} = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

module.exports = function override(config, env) {
  // babel-plugin-import
  config = injectBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    //style: 'css',
    style: true, // use less for customized theme
  }], config);

  // customize theme
  config.module.rules[2].oneOf.unshift(
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {

              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', 
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              // theme vars, also can use theme.js instead of this.
              modifyVars: {
                "@brand-primary": "#810D18", 
                "@brand-primary-tap": "#F7F5F5", 
              },
            },
          },
        ]
      }
  );

  // css-modules
  config.module.rules[2].oneOf.unshift(
      {
        test: /\.css$/,
        exclude: /node_modules|antd-mobile\.css/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]'
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {

              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', 
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ]
      }
  );

  // file-loader exclude
  let l = getLoader(config.module.rules, fileLoaderMatcher);
  l.exclude.push(/\.less$/);

  return config;
};
