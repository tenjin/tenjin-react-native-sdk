/**
 * Subscription provider using react-native-purchases (RevenueCat).
 *
 * Install: yarn add react-native-purchases
 *
 * RevenueCat does not expose SK2 transaction data at the JS level, so we use
 * Tenjin.subscriptionWithStoreKit() which fetches the SK2 transaction and
 * sends it to Tenjin in a single native call.
 */

import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import Tenjin from 'react-native-tenjin';
import type { CustomerInfo } from 'react-native-purchases';
import type { PurchasesEntitlementInfo } from '@revenuecat/purchases-typescript-internal';
import type { SubscriptionProvider, SubscriptionPurchase } from './types';

// Replace with your RevenueCat API keys
const REVENUECAT_API_KEY_IOS = 'YOUR_REVENUECAT_IOS_API_KEY';
const REVENUECAT_API_KEY_ANDROID = 'YOUR_REVENUECAT_ANDROID_API_KEY';

class RevenueCatProvider implements SubscriptionProvider {
  private trackedTransactions = new Set<string>();
  private listener: ((info: CustomerInfo) => void) | null = null;

  async setup(): Promise<void> {
    const apiKey = Platform.select({
      ios: REVENUECAT_API_KEY_IOS,
      android: REVENUECAT_API_KEY_ANDROID,
    });

    Purchases.configure({ apiKey: apiKey! });
  }

  listen(onPurchase: (purchase: SubscriptionPurchase) => void): () => void {
    this.listener = async (customerInfo: CustomerInfo) => {
      const entitlements = Object.values(
        customerInfo.entitlements.active
      ) as PurchasesEntitlementInfo[];

      for (const entitlement of entitlements) {
        const productId = entitlement.productIdentifier;

        // Deduplicate: only track each product once per session
        if (this.trackedTransactions.has(productId)) continue;
        this.trackedTransactions.add(productId);

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

    Purchases.addCustomerInfoUpdateListener(this.listener);

    return () => {
      if (this.listener) {
        Purchases.removeCustomerInfoUpdateListener(this.listener);
        this.listener = null;
      }
    };
  }

  async purchaseSubscription(productId: string): Promise<void> {
    const offerings = await Purchases.getOfferings();
    const packages = offerings.current?.availablePackages ?? [];
    const pkg = packages.find((p) => p.product.identifier === productId);

    if (pkg) {
      await Purchases.purchasePackage(pkg);
    } else {
      console.warn(`[RevenueCat] Package not found for product: ${productId}`);
    }
  }

  async teardown(): Promise<void> {
    if (this.listener) {
      Purchases.removeCustomerInfoUpdateListener(this.listener);
      this.listener = null;
    }
    this.trackedTransactions.clear();
  }

  private async extractPurchaseData(
    productId: string
  ): Promise<SubscriptionPurchase | null> {
    const offerings = await Purchases.getOfferings();
    const packages = offerings.current?.availablePackages ?? [];
    const product = packages.find(
      (p) => p.product.identifier === productId
    )?.product;

    if (!product) {
      return null;
    }

    // On iOS, use subscriptionWithStoreKit to fetch the SK2 transaction
    // and send it to Tenjin in a single native call
    if (Platform.OS === 'ios') {
      Tenjin.subscriptionWithStoreKit(
        product.identifier,
        product.currencyCode,
        product.price,
        () => {},
        (error) => console.error('[RevenueCat] subscriptionWithStoreKit failed:', error)
      );
      // Return null since Tenjin.subscriptionWithStoreKit handles everything natively
      return null;
    }

    return {
      productId: product.identifier,
      currencyCode: product.currencyCode,
      unitPrice: product.price,
    };
  }
}

export default RevenueCatProvider;
