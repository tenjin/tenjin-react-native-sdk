/**
 * Subscription provider using react-native-purchases (RevenueCat).
 *
 * Install: yarn add react-native-purchases
 *
 * This file demonstrates how to extract subscription purchase data from
 * RevenueCat and forward it to Tenjin for server-side verification.
 */

import Purchases, {
  type CustomerInfo,
  type PurchasesPackage,
} from 'react-native-purchases';
import type { SubscriptionProvider, SubscriptionPurchase } from './types';

// Replace with your RevenueCat API keys
const REVENUECAT_API_KEY_IOS = 'YOUR_REVENUECAT_IOS_API_KEY';
const REVENUECAT_API_KEY_ANDROID = 'YOUR_REVENUECAT_ANDROID_API_KEY';

import { Platform } from 'react-native';

class RevenueCatProvider implements SubscriptionProvider {
  private trackedTransactions = new Set<string>();
  private removeListener: (() => void) | null = null;

  async setup(): Promise<void> {
    const apiKey = Platform.select({
      ios: REVENUECAT_API_KEY_IOS,
      android: REVENUECAT_API_KEY_ANDROID,
    });

    Purchases.configure({ apiKey: apiKey! });
    console.log('[RevenueCat] Configured');
  }

  listen(onPurchase: (purchase: SubscriptionPurchase) => void): () => void {
    const listener = async (customerInfo: CustomerInfo) => {
      for (const entitlement of Object.values(customerInfo.entitlements.active) as any[]) {
        const productId = entitlement.productIdentifier;

        // Deduplicate: only track each product once per session
        if (this.trackedTransactions.has(productId)) continue;
        this.trackedTransactions.add(productId);

        console.log('[RevenueCat] New active entitlement:', productId);

        try {
          const purchase = await this.extractPurchaseData(productId);
          if (purchase) {
            onPurchase(purchase);
          }
        } catch (error) {
          console.error('[RevenueCat] Error extracting purchase data:', error);
        }
      }
    };

    Purchases.addCustomerInfoUpdateListener(listener);
    this.removeListener = () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };

    return () => {
      this.removeListener?.();
      this.removeListener = null;
    };
  }

  async purchaseSubscription(productId: string): Promise<void> {
    const offerings = await Purchases.getOfferings();
    const packages = offerings.current?.availablePackages ?? [];
    const pkg = packages.find(
      (p: PurchasesPackage) => p.product.identifier === productId
    );

    if (pkg) {
      await Purchases.purchasePackage(pkg);
    } else {
      console.warn(`[RevenueCat] Package not found for product: ${productId}`);
    }
  }

  async teardown(): Promise<void> {
    this.removeListener?.();
    this.removeListener = null;
    this.trackedTransactions.clear();
    console.log('[RevenueCat] Cleaned up');
  }

  private async extractPurchaseData(
    productId: string
  ): Promise<SubscriptionPurchase | null> {
    // Get product price info from offerings
    const offerings = await Purchases.getOfferings();
    const packages = offerings.current?.availablePackages ?? [];
    const product = packages.find(
      (p: PurchasesPackage) => p.product.identifier === productId
    )?.product;

    if (!product) {
      console.warn(`[RevenueCat] Product not found: ${productId}`);
      return null;
    }

    // RevenueCat abstracts away platform-specific receipt data.
    // For basic subscription tracking, productId + price is sufficient.
    // For full server-side verification, you may need to access the
    // underlying store transaction via RevenueCat's backend webhooks.
    return {
      productId: product.identifier,
      currencyCode: product.currencyCode,
      unitPrice: product.price,
    };
  }
}

export default RevenueCatProvider;
