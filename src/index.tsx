import { NativeModules, Platform } from 'react-native';
import { updatePostbackConversionValue } from './updatePostbackConversionValue';

const LINKING_ERROR =
  `The package 'react-native-tenjin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

function makeTenjin() {
  if (NativeModules.Tenjin) {
    const extendedObj = {
      updatePostbackConversionValue,
    };
    Object.setPrototypeOf(extendedObj, NativeModules.Tenjin);
    return extendedObj;
  } else {
    return new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
  }
}

export default makeTenjin();
