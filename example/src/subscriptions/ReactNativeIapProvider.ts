/**
 * Subscription provider using react-native-iap.
 *
 * Install: yarn add react-native-iap
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
  requestSubscription,
  finishTransaction,
  getReceiptIOS,
  type Purchase,
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

  async setup(): Promise<void> {
    await initConnection();
    console.log('[IAP] Connection initialized');
  }

  listen(onPurchase: (purchase: SubscriptionPurchase) => void): () => void {
    this.purchaseListener = purchaseUpdatedListener(async (purchase: Purchase) => {
      console.log('[IAP] Purchase received:', purchase.productId);

      try {
        const subscriptionData = await this.extractPurchaseData(purchase);
        onPurchase(subscriptionData);
        await finishTransaction({ purchase, isConsumable: false });
      } catch (error) {
        console.error('[IAP] Error processing purchase:', error);
      }
    });

    this.errorListener = purchaseErrorListener((error: { message: string }) => {
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
    if (Platform.OS === 'ios') {
      await requestSubscription({ request: { sku: productId } });
    } else {
      await requestSubscription({
        request: {
          skus: [productId],
        },
      });
    }
  }

  async teardown(): Promise<void> {
    this.purchaseListener?.remove();
    this.errorListener?.remove();
    await endConnection();
    console.log('[IAP] Connection ended');
  }

  private async extractPurchaseData(purchase: Purchase): Promise<SubscriptionPurchase> {
    const base: SubscriptionPurchase = {
      productId: purchase.productId,
      currencyCode: 'USD', // In production, get from product details via fetchProducts()
      unitPrice: 0,        // In production, get from product details via fetchProducts()
    };

    if (Platform.OS === 'ios') {
      const receipt = await getReceiptIOS();
      return {
        ...base,
        iosTransactionId: purchase.transactionId,
        iosOriginalTransactionId: (purchase as any).originalTransactionIdentifierIOS,
        iosReceipt: receipt,
        iosSKTransaction: (purchase as any).transactionReceipt,
      };
    } else {
      return {
        ...base,
        androidPurchaseToken: (purchase as any).purchaseToken,
        androidPurchaseData: (purchase as any).dataAndroid,
        androidDataSignature: (purchase as any).signatureAndroid,
      };
    }
  }
}

export const subscriptionSkus = SUBSCRIPTION_SKUS;
export default ReactNativeIapProvider;
