import { NativeModules, Platform } from 'react-native';
import {
  updatePostbackConversionValue,
  type TenjinCoarseConversionValue,
} from './updatePostbackConversionValue';

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

export interface TenjinSDK {
  initialize(apiKey: string): void;
  connect(): void;
  optIn(): void;
  optOut(): void;
  optInParams(params: string[]): void;
  optOutParams(params: string[]): void;
  optInOutUsingCMP(): void;
  optOutGoogleDMA(): void;
  optInGoogleDMA(): void;
  setAppStore(type: 'googleplay' | 'amazon' | 'other'): void;
  transaction(
    productName: string,
    currencyCode: string,
    quantity: number,
    unitPrice: number
  ): void;
  transactionWithReceipt(
    productName: string,
    currencyCode: string,
    quantity: number,
    unitPrice: number,
    transactionId: string,
    receipt: string
  ): void;
  transactionWithDataSignature(
    productName: string,
    currencyCode: string,
    quantity: number,
    unitPrice: number,
    purchaseData: string,
    dataSignature: string
  ): void;
  eventWithName(name: string): void;
  eventWithNameAndValue(name: string, value: string): void;
  appendAppSubversion(subversion: number): void;
  updatePostbackConversionValue(
    conversionValue: number,
    coarseValue?: TenjinCoarseConversionValue,
    lockWindow?: boolean
  ): void;
  getAttributionInfo(
    successCallback: (info: Record<string, any>) => void,
    errorCallback: (error: string) => void
  ): void;
  eventAdImpressionAdMob(json: Record<string, any>): void;
  eventAdImpressionAppLovin(json: Record<string, any>): void;
  eventAdImpressionHyperBid(json: Record<string, any>): void;
  eventAdImpressionIronSource(json: Record<string, any>): void;
  eventAdImpressionTopOn(json: Record<string, any>): void;
  eventAdImpressionTradPlus(json: Record<string, any>): void;
  setCustomerUserId(userId: string): void;
  getCustomerUserId(callback: (userId: string) => void): void;
  getAnalyticsInstallationId(callback: (id: string) => void): void;
  setGoogleDMAParameters(
    adPersonalization: boolean,
    adUserData: boolean
  ): void;
  setCacheEventSetting(setting: boolean): void;
  setEncryptRequestsSetting(setting: boolean): void;
  getUserProfileDictionary(callback: (profile: Record<string, any>) => void): void;
  resetUserProfile(): void;
}

function makeTenjin(): TenjinSDK {
  if (TenjinModule) {
    const extendedObj = {
      updatePostbackConversionValue,
    };
    Object.setPrototypeOf(extendedObj, TenjinModule);
    return extendedObj as TenjinSDK;
  } else {
    return new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    ) as TenjinSDK;
  }
}

const Tenjin = makeTenjin();

export default Tenjin;
export type { TenjinCoarseConversionValue };
