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
| `iosTransactionId` | `string?` | iOS | Transaction ID from StoreKit 2 |
| `iosOriginalTransactionId` | `string?` | iOS | Original transaction ID (for renewals) |
| `iosReceipt` | `string?` | iOS | JWS signed transaction token |
| `iosSKTransaction` | `string?` | iOS | StoreKit 2 transaction JSON representation |
| `androidPurchaseToken` | `string?` | Android | Purchase token from Google Play Billing |
| `androidPurchaseData` | `string?` | Android | Original JSON from the purchase object |
| `androidDataSignature` | `string?` | Android | Signature for purchase verification |

---

## Helper Methods (iOS only)

### `subscriptionWithStoreKit`

Fetches the latest StoreKit 2 transaction for a product and sends it to Tenjin in a single native call. No SK2 data needs to be extracted in JavaScript. This is the recommended approach when your IAP library (e.g., RevenueCat, Adapty, Qonversion) doesn't expose SK2 transaction data.

```javascript
Tenjin.subscriptionWithStoreKit(
  'com.example.monthly', // productId
  'USD',                  // currencyCode
  9.99,                   // unitPrice
  (success) => console.log('Subscription tracked'),
  (error) => console.error('Failed:', error)
);
```

---

## Using react-native-iap (v14)

> Requires `react-native-iap` and `react-native-nitro-modules` as dependencies.

On iOS, `react-native-iap` v14 provides the JWS signed transaction as `purchase.purchaseToken`. The JWS payload contains the SK2 transaction `jsonRepresentation` which can be extracted by decoding the middle segment.

```javascript
import { Platform } from 'react-native';
import {
  initConnection,
  fetchProducts,
  purchaseUpdatedListener,
  finishTransaction,
} from 'react-native-iap';
import Tenjin from 'react-native-tenjin';

// Must fetch products before purchasing
await initConnection();
const products = await fetchProducts({ skus: ['com.example.monthly'], type: 'subs' });

purchaseUpdatedListener(async (purchase) => {
  if (purchase.platform === 'ios') {
    // purchaseToken on iOS is the JWS signed transaction
    const jws = purchase.purchaseToken ?? '';

    // Decode JWS payload to get SK2 transaction jsonRepresentation
    let jsonRepresentation = '';
    if (jws) {
      const parts = jws.split('.');
      if (parts.length === 3) {
        try {
          jsonRepresentation = atob(parts[1]);
        } catch {}
      }
    }

    // Extract transaction IDs from the decoded JSON
    let transactionId = String(purchase.id ?? '');
    let originalTransactionId = String(
      purchase.originalTransactionIdentifierIOS ?? purchase.id ?? ''
    );
    if (jsonRepresentation) {
      try {
        const txData = JSON.parse(jsonRepresentation);
        if (txData.transactionId) transactionId = String(txData.transactionId);
        if (txData.originalTransactionId)
          originalTransactionId = String(txData.originalTransactionId);
      } catch {}
    }

    // Look up price from previously fetched products
    const product = products?.find((p) => p.id === purchase.productId);

    Tenjin.subscription({
      productId: purchase.productId,
      currencyCode: product?.currency ?? 'USD',
      unitPrice: product?.price ?? 0,
      iosTransactionId: transactionId,
      iosOriginalTransactionId: originalTransactionId,
      iosReceipt: jws,
      iosSKTransaction: jsonRepresentation,
    });

    await finishTransaction({ purchase, isConsumable: false });
  }

  if (purchase.platform === 'android') {
    const product = products?.find((p) => p.id === purchase.productId);

    Tenjin.subscription({
      productId: purchase.productId,
      currencyCode: product?.currency ?? 'USD',
      unitPrice: product?.price ?? 0,
      androidPurchaseToken:
        purchase.purchaseTokenAndroid ?? purchase.purchaseToken,
      androidPurchaseData: purchase.dataAndroid,
      androidDataSignature: purchase.signatureAndroid,
    });

    await finishTransaction({ purchase, isConsumable: false });
  }
});
```

---

## Using RevenueCat (react-native-purchases)

RevenueCat does not expose SK2 transaction data at the JavaScript level. Use `subscriptionWithStoreKit()` to handle everything natively — it fetches the SK2 transaction directly from StoreKit 2 and sends it to Tenjin in a single call.

```javascript
import Purchases from 'react-native-purchases';
import Tenjin from 'react-native-tenjin';

const trackedTransactions = new Set();

Purchases.addCustomerInfoUpdateListener(async (customerInfo) => {
  for (const entitlement of Object.values(
    customerInfo.entitlements.active
  )) {
    const productId = entitlement.productIdentifier;

    if (trackedTransactions.has(productId)) continue;
    trackedTransactions.add(productId);

    // Get product price from offerings
    const offerings = await Purchases.getOfferings();
    const packages = offerings.current?.availablePackages ?? [];
    const product = packages.find(
      (p) => p.product.identifier === productId
    )?.product;

    if (product) {
      // Fetches SK2 transaction and sends to Tenjin natively
      Tenjin.subscriptionWithStoreKit(
        product.identifier,
        product.currencyCode,
        product.price,
        () => {},
        (error) => console.error('Subscription tracking failed:', error)
      );
    }
  }
});
```
