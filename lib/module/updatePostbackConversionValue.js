import { NativeModules } from 'react-native';
const nativeTenjin = NativeModules.Tenjin;
export const updatePostbackConversionValue = (conversionValue, coarseValue, lockWindow) => {
  if (lockWindow !== undefined) {
    return nativeTenjin.updatePostbackConversionValueWithCoarseValueAndLockWindow(conversionValue, coarseValue, lockWindow);
  } else if (coarseValue !== undefined) {
    return nativeTenjin.updatePostbackConversionValueWithCoarseValue(conversionValue, coarseValue);
  } else {
    return nativeTenjin.updatePostbackConversionValue(conversionValue);
  }
};
//# sourceMappingURL=updatePostbackConversionValue.js.map
