import { NativeModules } from 'react-native';

const nativeTenjin = NativeModules.Tenjin;

export type TenjinCoarseConversionValue = 'low' | 'medium' | 'high';

export const updatePostbackConversionValue = (
  conversionValue: number,
  coarseValue?: TenjinCoarseConversionValue,
  lockWindow?: boolean
  ) => {
    if (lockWindow) {
      return nativeTenjin.updatePostbackConversionValueWithCoarseValueAndLockWindow(
        conversionValue,
        coarseValue,
        lockWindow
        );
      } else if (coarseValue) {
        return nativeTenjin.updatePostbackConversionValueWithCoarseValue(
          conversionValue,
          coarseValue
          );
        } else {
          return nativeTenjin.updatePostbackConversionValue(conversionValue);
        }
      };