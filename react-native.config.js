/**
 * @type {import('@react-native-community/cli-types').UserDependencyConfig}
 */
module.exports = {
  dependency: {
    platforms: {
      android: {
        packageName: 'com.tenjin',
        sourceDir: './android',
        cmakeListsPath: 'build/generated/source/codegen/jni/CMakeLists.txt',
      },
      ios: {},
    },
  },
};
