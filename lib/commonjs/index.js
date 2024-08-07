"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _updatePostbackConversionValue = require("./updatePostbackConversionValue");
const LINKING_ERROR = `The package 'react-native-tenjin' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const Tenjin = _reactNative.NativeModules.Tenjin ? {
  ..._reactNative.NativeModules.Tenjin,
  updatePostbackConversionValue: _updatePostbackConversionValue.updatePostbackConversionValue
} : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
var _default = exports.default = Tenjin;
//# sourceMappingURL=index.js.map
