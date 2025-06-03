module.exports = {
  presets: ['module:@react-native/babel-preset', "@babel/preset-typescript"],
  plugins: [
    ['module-resolver', { root: ['.'], alias: { app: './app' } }],
    'react-native-reanimated/plugin',
  ],
};
