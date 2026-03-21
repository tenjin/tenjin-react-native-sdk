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

// Ensure value is a string or null — guards against numeric IDs from IAP libraries
const toStringOrNull = (value: string | undefined): string | null => {
  if (value == null) return null;
  return typeof value === 'string' ? value : String(value);
};

export const subscription = (params: SubscriptionParams): void => {
  nativeTenjin.subscription(
    String(params.productId),
    String(params.currencyCode),
    Number(params.unitPrice),
    toStringOrNull(params.iosTransactionId),
    toStringOrNull(params.iosOriginalTransactionId),
    toStringOrNull(params.iosReceipt),
    toStringOrNull(params.iosSKTransaction),
    toStringOrNull(params.androidPurchaseToken),
    toStringOrNull(params.androidPurchaseData),
    toStringOrNull(params.androidDataSignature)
  );
};
