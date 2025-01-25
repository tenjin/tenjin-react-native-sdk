import { NativeModules, Platform } from 'react-native';
import { updatePostbackConversionValue } from './updatePostbackConversionValue';

const LINKING_ERROR =
  `The package 'react-native-tenjin' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const TenjinModule = isTurboModuleEnabled
  ? require('./NativeTenjin').default
  : NativeModules.Tenjin;

console.log("TurboModule",TenjinModule);

function makeTenjin() {
  if (TenjinModule) {
    const extendedObj = {
      updatePostbackConversionValue,
    };
    Object.setPrototypeOf(extendedObj, TenjinModule);
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

export default makeTenjin();