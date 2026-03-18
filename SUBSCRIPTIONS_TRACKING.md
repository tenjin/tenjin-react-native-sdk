# Tenjin – React Native Subscription Tracking

Track subscription purchases with Tenjin for server-side verification and attribution.

## Method

```javascript
import Tenjin from 'react-native-tenjin';

Tenjin.subscription({
  productId: 'com.example.monthly',     // Required
  currencyCode: 'USD',                   // Required
  unitPrice: 9.99,                       // Required
  // iOS parameters
  iosTransactionId: '...',
  iosOriginalTransactionId: '...',
  iosReceipt: '...',
  iosSKTransaction: '...',
  // Android parameters
  androidPurchaseToken: '...',
  androidPurchaseData: '...',
  androidDataSignature: '...',
});
```

### Parameters

| Parameter | Type | Platform | Description |
|-----------|------|----------|-------------|
| `productId` | `string` | Both | Product identifier |
| `currencyCode` | `string` | Both | ISO 4217 currency code (e.g., "USD") |
| `unitPrice` | `number` | Both | Price (e.g., 9.99) |
| `iosTransactionId` | `string?` | iOS | Transaction ID from StoreKit |
| `iosOriginalTransactionId` | `string?` | iOS | Original transaction ID (for renewals) |
| `iosReceipt` | `string?` | iOS | Base64-encoded receipt |
| `iosSKTransaction` | `string?` | iOS | StoreKit 2 transaction JSON representation |
| `androidPurchaseToken` | `string?` | Android | Purchase token from Google Play Billing |
| `androidPurchaseData` | `string?` | Android | Original JSON from the purchase object |
| `androidDataSignature` | `string?` | Android | Signature for purchase verification |

---

## Using react-native-iap

### iOS

```javascript
import { Platform } from 'react-native';
import {
  purchaseUpdatedListener,
  getReceiptIOS,
  type ProductPurchase,
} from 'react-native-iap';
import Tenjin from 'react-native-tenjin';

purchaseUpdatedListener(async (purchase: ProductPurchase) => {
  if (Platform.OS === 'ios') {
    const receipt = await getReceiptIOS({ forceRefresh: false });

    Tenjin.subscription({
      productId: purchase.productId,
      currencyCode: 'USD', // get from your product details
      unitPrice: 9.99,     // get from your product details
      iosTransactionId: purchase.transactionId,
      iosOriginalTransactionId: purchase.originalTransactionIdentifierIOS,
      iosReceipt: receipt,
      iosSKTransaction: purchase.transactionReceipt,
    });
  }
});
```

### Android

```javascript
import { Platform } from 'react-native';
import {
  purchaseUpdatedListener,
  type ProductPurchase,
} from 'react-native-iap';
import Tenjin from 'react-native-tenjin';

purchaseUpdatedListener(async (purchase: ProductPurchase) => {
  if (Platform.OS === 'android') {
    Tenjin.subscription({
      productId: purchase.productId,
      currencyCode: 'USD', // get from your product details
      unitPrice: 9.99,     // get from your product details
      androidPurchaseToken: purchase.purchaseToken,
      androidPurchaseData: purchase.dataAndroid,
      androidDataSignature: purchase.signatureAndroid,
    });
  }
});
```

---

## Using RevenueCat (react-native-purchases)

```javascript
import Purchases from 'react-native-purchases';
import Tenjin from 'react-native-tenjin';

// Track active subscriptions, avoiding duplicates
const trackedTransactions = new Set<string>();

Purchases.addCustomerInfoUpdateListener(async (customerInfo) => {
  for (const entitlement of Object.values(
    customerInfo.entitlements.active
  )) {
    const productId = entitlement.productIdentifier;

    // Skip if already tracked
    if (trackedTransactions.has(productId)) continue;
    trackedTransactions.add(productId);

    // Get product price from offerings
    const offerings = await Purchases.getOfferings();
    const packages = offerings.current?.availablePackages ?? [];
    const product = packages.find(
      (p) => p.product.identifier === productId
    )?.product;

    if (product) {
      Tenjin.subscription({
        productId: product.identifier,
        currencyCode: product.currencyCode,
        unitPrice: product.price,
      });
    }
  }
});
```
