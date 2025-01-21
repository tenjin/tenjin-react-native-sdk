"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostbackConversionValue = void 0;
var _reactNative = require("react-native");
const nativeTenjin = _reactNative.NativeModules.Tenjin;
const updatePostbackConversionValue = (conversionValue, coarseValue, lockWindow) => {
  if (lockWindow !== undefined) {
    return nativeTenjin.updatePostbackConversionValueWithCoarseValueAndLockWindow(conversionValue, coarseValue, lockWindow);
  } else if (coarseValue !== undefined) {
    return nativeTenjin.updatePostbackConversionValueWithCoarseValue(conversionValue, coarseValue);
  } else {
    return nativeTenjin.updatePostbackConversionValue(conversionValue);
  }
};
exports.updatePostbackConversionValue = updatePostbackConversionValue;
//# sourceMappingURL=updatePostbackConversionValue.js.map