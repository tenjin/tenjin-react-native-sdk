"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _updatePostbackConversionValue = require("./updatePostbackConversionValue.js");
const LINKING_ERROR = `The package 'react-native-tenjin' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const TenjinModule = isTurboModuleEnabled ? require('./NativeTenjin').default : _reactNative.NativeModules.Tenjin;
console.log("TurboModule", TenjinModule);
function makeTenjin() {
  if (TenjinModule) {
    const extendedObj = {
      updatePostbackConversionValue: _updatePostbackConversionValue.updatePostbackConversionValue
    };
    Object.setPrototypeOf(extendedObj, TenjinModule);
    return extendedObj;
  } else {
    return new Proxy({}, {
      get() {
        throw new Error(LINKING_ERROR);
      }
    });
  }
}

// const Tenjin = TenjinModule
//   ? {
//       ...TenjinModule,
//       updatePostbackConversionValue,
//     }
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       }
//     );
var _default = exports.default = makeTenjin();
//# sourceMappingURL=index.js.map