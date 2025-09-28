// babel.config.js
module.exports = {
  presets: [
    'module:@react-native/babel-preset'
  ],
  plugins: [
    'react-native-worklets/plugin',
    '@babel/plugin-transform-flow-strip-types'
  ],
};
