/**
 * Subscription provider using react-native-iap (v14).
 *
 * Install: yarn add react-native-iap react-native-nitro-modules
 *
 * This file demonstrates how to extract subscription purchase data from
 * react-native-iap and forward it to Tenjin for server-side verification.
 */

import { Platform } from 'react-native';
import {
  initConnection,
  endConnection,
  purchaseUpdatedListener,
  purchaseErrorListener,
  requestPurchase,
  finishTransaction,
  fetchProducts,
  type Purchase,
  type PurchaseError,
  type EventSubscription,
} from 'react-native-iap';
import type { SubscriptionProvider, SubscriptionPurchase } from './types';

// Replace with your actual subscription product IDs
const SUBSCRIPTION_SKUS = Platform.select({
  ios: ['com.example.monthly', 'com.example.yearly'],
  android: ['com.example.monthly', 'com.example.yearly'],
}) ?? [];

class ReactNativeIapProvider implements SubscriptionProvider {
  private purchaseListener: EventSubscription | null = null;
  private errorListener: EventSubscription | null = null;
  private products: Array<{ id: string; currency?: string | null; price?: number | null }> = [];

  async setup(): Promise<void> {
    await initConnection();

    // Must fetch products before purchasing — registers product IDs with StoreKit
    const result = await fetchProducts({
      skus: SUBSCRIPTION_SKUS,
      type: 'subs',
    });
    this.products = result ?? [];
  }

  listen(onPurchase: (purchase: SubscriptionPurchase) => void): () => void {
    this.purchaseListener = purchaseUpdatedListener(
      async (purchase: Purchase) => {
        const subscriptionData = this.extractPurchaseData(purchase);
        onPurchase(subscriptionData);
        await finishTransaction({ purchase, isConsumable: false });
      }
    );

    this.errorListener = purchaseErrorListener((error: PurchaseError) => {
      console.error('[IAP] Purchase error:', error.message);
    });

    return () => {
      this.purchaseListener?.remove();
      this.errorListener?.remove();
      this.purchaseListener = null;
      this.errorListener = null;
    };
  }

  async purchaseSubscription(productId: string): Promise<void> {
    await requestPurchase({
      request: Platform.select({
        ios: { apple: { sku: productId } },
        android: { google: { skus: [productId] } },
      })! as any,
      type: 'subs',
    });
  }

  async teardown(): Promise<void> {
    this.purchaseListener?.remove();
    this.errorListener?.remove();
    await endConnection();
  }

  private extractPurchaseData(purchase: Purchase): SubscriptionPurchase {
    const product = this.products.find((p) => p.id === purchase.productId);

    const base: SubscriptionPurchase = {
      productId: purchase.productId,
      currencyCode: product?.currency ?? 'USD',
      unitPrice: product?.price ?? 0,
    };

    if (purchase.platform === 'ios') {
      const iosPurchase = purchase as any;
      // purchaseToken on iOS is the JWS (JSON Web Signature) signed transaction
      const jws = purchase.purchaseToken ?? '';

      // The JWS payload (middle segment) is the SK2 transaction jsonRepresentation
      let jsonRepresentation = '';
      if (jws) {
        const parts = jws.split('.');
        if (parts.length === 3) {
          try {
            jsonRepresentation = atob(parts[1]!);
          } catch {
            jsonRepresentation = '';
          }
        }
      }

      // Extract transaction IDs from jsonRepresentation when available,
      // as the mapped purchase object may have placeholder values in sandbox
      let transactionId = String(purchase.id ?? '');
      let originalTransactionId = String(
        iosPurchase.originalTransactionIdentifierIOS ?? purchase.id ?? ''
      );
      if (jsonRepresentation) {
        try {
          const txData = JSON.parse(jsonRepresentation);
          if (txData.transactionId) transactionId = String(txData.transactionId);
          if (txData.originalTransactionId) originalTransactionId = String(txData.originalTransactionId);
        } catch { /* use mapped values */ }
      }

      return {
        ...base,
        iosTransactionId: transactionId,
        iosOriginalTransactionId: originalTransactionId,
        iosReceipt: jws,
        iosSKTransaction: jsonRepresentation,
      };
    } else {
      const androidPurchase = purchase as any;
      return {
        ...base,
        androidPurchaseToken:
          androidPurchase.purchaseTokenAndroid ?? purchase.purchaseToken ?? '',
        androidPurchaseData: androidPurchase.dataAndroid ?? '',
        androidDataSignature: androidPurchase.signatureAndroid ?? '',
      };
    }
  }
}

export const subscriptionSkus = SUBSCRIPTION_SKUS;
export default ReactNativeIapProvider;
