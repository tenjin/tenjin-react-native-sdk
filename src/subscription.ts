import { NativeModules } from 'react-native';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const nativeTenjin = isTurboModuleEnabled
  ? require('./NativeTenjin').default
  : NativeModules.Tenjin;

export interface SubscriptionParams {
  productId: string;
  currencyCode: string;
  unitPrice: number;
  /** iOS only: transaction ID from StoreKit */
  iosTransactionId?: string;
  /** iOS only: original transaction ID for subscription renewals */
  iosOriginalTransactionId?: string;
  /** iOS only: base64-encoded receipt */
  iosReceipt?: string;
  /** iOS only: StoreKit 2 transaction JSON representation */
  iosSKTransaction?: string;
  /** Android only: purchase token from Google Play Billing */
  androidPurchaseToken?: string;
  /** Android only: original JSON from the purchase object */
  androidPurchaseData?: string;
  /** Android only: signature for purchase verification */
  androidDataSignature?: string;
}

export const subscription = (params: SubscriptionParams): void => {
  nativeTenjin.subscription(
    params.productId,
    params.currencyCode,
    params.unitPrice,
    params.iosTransactionId ?? null,
    params.iosOriginalTransactionId ?? null,
    params.iosReceipt ?? null,
    params.iosSKTransaction ?? null,
    params.androidPurchaseToken ?? null,
    params.androidPurchaseData ?? null,
    params.androidDataSignature ?? null
  );
};
