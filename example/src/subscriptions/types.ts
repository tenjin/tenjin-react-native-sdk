/**
 * Platform-agnostic subscription purchase data extracted from IAP libraries.
 * This is what gets passed to Tenjin.subscription().
 */
export interface SubscriptionPurchase {
  productId: string;
  currencyCode: string;
  unitPrice: number;
  // iOS
  iosTransactionId?: string;
  iosOriginalTransactionId?: string;
  iosReceipt?: string;
  iosSKTransaction?: string;
  // Android
  androidPurchaseToken?: string;
  androidPurchaseData?: string;
  androidDataSignature?: string;
}

export interface SubscriptionProvider {
  /**
   * Initialize the IAP library. Call once on app start.
   */
  setup(): Promise<void>;

  /**
   * Start listening for subscription purchases.
   * The callback fires for each new subscription that should be tracked.
   * Returns a teardown function to stop listening.
   */
  listen(onPurchase: (purchase: SubscriptionPurchase) => void): () => void;

  /**
   * Trigger a subscription purchase flow for testing.
   */
  purchaseSubscription(productId: string): Promise<void>;

  /**
   * Clean up connections. Call on app unmount.
   */
  teardown(): Promise<void>;
}
