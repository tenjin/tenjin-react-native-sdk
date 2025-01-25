/**
 * @type {import('@react-native-community/cli-types').UserDependencyConfig}
 */
module.exports = {
  dependency: {
    platforms: {
      android: {
        packageName: 'com.tenjin',
        sourceDir: './android',
        cmakeListsPath: 'generated/jni/CMakeLists.txt',
      },
      ios: {},
    },
  },
};
