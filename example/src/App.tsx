// --- START QUICK NETWORK LOGGER ---
const originalFetch = global.fetch;
global.fetch = async (...args) => {
  const url = args[0];
  const options = args[1];

  console.log(`🚀 [Network Request] ${options?.method || 'GET'}: ${url}`);
  if (options?.body) {
    console.log('📦 Body:', options.body);
  }

  try {
    const response = await originalFetch(...args);
    console.log(`✅ [Response] ${url} | Status: ${response.status}`);
    return response;
  } catch (error) {
    console.error(`❌ [Network Error] ${url}:`, error);
    throw error;
  }
};
// --- END QUICK NETWORK LOGGER ---

import { useEffect, useRef } from 'react';
import { StyleSheet, Button, ScrollView } from 'react-native';
import Tenjin from 'react-native-tenjin';
import { NativeModules } from 'react-native';
import {
  Provider,
  subscriptionSkus,
  type SubscriptionProvider,
} from './subscriptions';

console.log('[Tenjin]: NativeModules.Tenjin:', NativeModules.Tenjin);

export default function App() {
  console.log(Tenjin);

  const providerRef = useRef<SubscriptionProvider | null>(null);

  useEffect(() => {
    const provider = new Provider();
    providerRef.current = provider;

    provider.setup().then(() => {
      const unlisten = provider.listen((purchase) => {
        console.log('[Tenjin] Tracking subscription:', purchase.productId);
        Tenjin.subscription(purchase);
      });

      return () => {
        unlisten();
        provider.teardown();
      };
    });

    return () => {
      provider.teardown();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title="Initialize"
        onPress={() => {
          Tenjin.initialize('YOUR_SDK_KEY');
          Tenjin.setCacheEventSetting(true);
          Tenjin.setEncryptRequestsSetting(true);
        }}
      />
      <Button title="Connect" onPress={() => Tenjin.connect()} />
      <Button
        title="Set AppStore"
        onPress={() => Tenjin.setAppStore('googleplay')}
      />
      <Button title="Opt In" onPress={() => Tenjin.optIn()} />
      <Button title="Opt Out" onPress={() => Tenjin.optOut()} />
      <Button
        title="Subscription (via IAP provider)"
        onPress={() => {
          const sku = subscriptionSkus[0];
          if (sku) {
            console.log('[App] Requesting subscription:', sku);
            providerRef.current?.purchaseSubscription(sku);
          }
        }}
      />
      <Button
        title="Subscription (StoreKit native)"
        onPress={() =>
          Tenjin.subscriptionWithStoreKit(
            'com.example.monthly',
            'USD',
            9.99,
            () => console.log('[App] subscriptionWithStoreKit succeeded'),
            (error) => console.error('[App] subscriptionWithStoreKit failed:', error)
          )
        }
      />
      <Button
        title="Subscription (manual test)"
        onPress={() =>
          Tenjin.subscription({
            productId: 'test_subscription_monthly',
            currencyCode: 'USD',
            unitPrice: 9.99,
            iosTransactionId: 'ios_txn_123',
            iosOriginalTransactionId: 'ios_orig_txn_123',
            iosReceipt: 'base64_receipt_data',
            iosSKTransaction: '{"productID":"test_subscription_monthly"}',
            androidPurchaseToken: 'android_token_123',
            androidPurchaseData: '{"orderId":"GPA.1234"}',
            androidDataSignature: 'android_signature',
          })
        }
      />
      <Button
        title="Send event"
        onPress={() => Tenjin.eventWithName('TenjinTestEvent')}
      />
      <Button
        title="Transaction"
        onPress={() =>
          Tenjin.transactionWithDataSignature(
            'test_product',
            'USD',
            1,
            4.99,
            'purchase_data',
            'signature'
          )
        }
      />
      <Button
        title="Send event with value"
        onPress={() => Tenjin.eventWithNameAndValue('TenjinTestEvent', 2)}
      />
      <Button
        title="Update postback (SKAN)"
        onPress={() => Tenjin.updatePostbackConversionValue(2, 'medium', true)}
      />
      <Button
        title="Set customer user id"
        onPress={() => Tenjin.setCustomerUserId('Test_RN_Tenjin')}
      />
      <Button
        title="Get customer user id"
        onPress={() =>
          Tenjin.getCustomerUserId((userId: string) => {
            console.log(`Customer User ID: ${userId}`);
          })
        }
      />
      <Button
        title="Get analytics installation ID"
        onPress={() =>
          Tenjin.getAnalyticsInstallationId((id: string) => {
            console.log(`Analytics Installation ID: ${id}`);
          })
        }
      />
      <Button
        title="Attribution Info"
        onPress={() =>
          Tenjin.getAttributionInfo(
            (info) => {
              console.log(`Attribution info found!`, info);
            },
            (error) => {
              console.error(`Attribution info failed:`, error);
            }
          )
        }
      />
      <Button
        title="AppLovin Impression"
        onPress={() =>
          Tenjin.eventAdImpressionAppLovin({
            json: {
              format: 'Banner',
              revenue_precision: 'exact',
              ad_unit_id: '123456789',
              network_placement: 'banner_regular',
              placement: '',
              publisher_revenue_decimal: '0',
              ad_revenue_currency: 'USD',
              revenue: '0',
              creative_id: '1234567',
              publisher_revenue_micro: '0',
              network_name: 'AppLovin',
            },
          })
        }
      />
      <Button
        title="Get User Profile"
        onPress={() =>
          Tenjin.getUserProfileDictionary((profile) => {
            console.log('===> User Profile Data:');
            Object.entries(profile).forEach(([key, value]) => {
              console.log(`===> ${key}: ${value}`);
            });
          })
        }
      />
      <Button
        title="Reset User Profile"
        onPress={() => {
          Tenjin.resetUserProfile();
          console.log('===> User Profile has been reset');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});
