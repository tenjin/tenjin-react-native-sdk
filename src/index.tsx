import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-tenjin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export type TenjinCoarseConversionValue = 'low' | 'medium' | 'high';

const nativeTenjin = NativeModules.Tenjin;

const Tenjin = nativeTenjin
  ? {
      ...nativeTenjin,
      updatePostbackConversionValue: (
        conversionValue: number,
        coarseValue?: TenjinCoarseConversionValue,
        lockWindow?: number
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
      },
    }
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default Tenjin;
