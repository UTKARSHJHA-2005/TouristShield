module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-native-worklets/plugin',
    // maybe '@babel/plugin-transform-flow-strip-types'
  ],
};
