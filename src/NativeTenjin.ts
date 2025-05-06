import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type JSONObject = {
  [key: string]: string | number | boolean | null | JSONObject | JSONObject[];
};

export interface Spec extends TurboModule {
  initialize(apiKey: string): void;
  connect(): void;
  optIn(): void;
  optOut(): void;
  optInParams(params: string[]): void;
  optOutParams(params: string[]): void;
  optInOutUsingCMP(): void;
  optOutGoogleDMA(): void;
  optInGoogleDMA(): void;
  setAppStore(type: string): void;
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
    transaction: string,
    data: string
  ): void;
  eventWithName(name: string): void;
  eventWithNameAndValue(name: string, value: string): void;
  appendAppSubversion(version: number): void;
  updatePostbackConversionValue(conversionValue: number): void;
  updatePostbackConversionValueWithCoarseValue(
    conversionValue: number,
    coarseValue: string
  ): void;
  updatePostbackConversionValueWithCoarseValueAndLockWindow(
    conversionValue: number,
    coarseValue: string,
    lockWindow: boolean
  ): void;
  getAttributionInfo(
    successCallback: (info: JSONObject) => void,
    errorCallback: (error: string) => void
  ): void;
  eventAdImpressionAdMob(json: JSONObject): void;
  eventAdImpressionAppLovin(json: JSONObject): void;
  eventAdImpressionHyperBid(json: JSONObject): void;
  eventAdImpressionIronSource(json: JSONObject): void;
  eventAdImpressionTopOn(json: JSONObject): void;
  eventAdImpressionTradPlus(json: JSONObject): void;
  setCustomerUserId(userId: string): void;
  getCustomerUserId(callback: (userId: string) => void): void;
  getAnalyticsInstallationId(callback: (id: string) => void): void;
  setGoogleDMAParameters(
    adPersonalization: boolean,
    adUserData: boolean
  ): void;
  setCacheEventSetting(setting: boolean): void;
  setEncryptRequestsSetting(setting: boolean): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Tenjin');
