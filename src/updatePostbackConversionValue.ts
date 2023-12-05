import { NativeModules } from 'react-native';

const nativeTenjin = NativeModules.Tenjin;

export type TenjinCoarseConversionValue = 'low' | 'medium' | 'high';

export const updatePostbackConversionValue = (
  conversionValue: number,
  coarseValue?: TenjinCoarseConversionValue,
  lockWindow?: boolean
): void => {
  if (lockWindow !== undefined) {
    return nativeTenjin.updatePostbackConversionValueWithCoarseValueAndLockWindow(
      conversionValue,
      coarseValue,
      lockWindow
    );
  } else if (coarseValue !== undefined) {
    return nativeTenjin.updatePostbackConversionValueWithCoarseValue(
      conversionValue,
      coarseValue
    );
  } else {
    return nativeTenjin.updatePostbackConversionValue(conversionValue);
  }
};