/**
 * Subscription provider configuration.
 *
 * Both libraries are always installed. Switch the active provider by changing
 * the ACTIVE_PROVIDER constant below.
 */

import ReactNativeIapProvider, {
  subscriptionSkus as iapSkus,
} from './ReactNativeIapProvider';
import RevenueCatProvider from './RevenueCatProvider';
import type { SubscriptionProvider } from './types';

export type { SubscriptionProvider, SubscriptionPurchase } from './types';

// Change this to switch providers:
const ACTIVE_PROVIDER: 'react-native-iap' | 'revenuecat' = 'react-native-iap';

const revenueCatSkus = ['com.example.monthly', 'com.example.yearly'];

export const Provider: new () => SubscriptionProvider =
  ACTIVE_PROVIDER === 'react-native-iap'
    ? ReactNativeIapProvider
    : RevenueCatProvider;

export const subscriptionSkus =
  ACTIVE_PROVIDER === 'react-native-iap' ? iapSkus : revenueCatSkus;
