# React Native Tenjin Plugin

# Summary

The Tenjin React Native Plugin allows users to track events and installs in their iOS/Android apps. To learn more about Tenjin and our product offering, please visit https://www.tenjin.com.

### Notes:

On iOS:
For AppTrackingTransparency, be sure to update your project `.plist` file and add `NSUserTrackingUsageDescription` along with the text message you want to display to users. This library is only available in iOS 14.0+. For further information on this, you can check our [iOS documentation](https://github.com/tenjin/tenjin-ios-sdk#-skadnetwork-and-ios-15-advertiser-postbacks)

# Plugin Integration

## Getting started
`$ npm install react-native-tenjin --save`

### Mostly automatic installation
`$ react-native link react-native-tenjin`

### Import
```javascript
import Tenjin from 'react-native-tenjin';
```

## Available methods

### Initialize
You need to initialize the plugin before doing calling any of the other methods available, for this, you would need the api key provided on Tenjin's dashboard:
```javascript
Tenjin.initialize(apiKey)
```
Parameters:
- `apiKey`: String

### Connect
```javascript
Tenjin.connect()
```

### Set AppStore type (only available for Android)
```javascript
Tenjin.setAppStore(type)
```
Parameters:
- `type`: String, possible values (googleplay, amazon, other)

### OptIn
```javascript
Tenjin.optIn()
```

### OptOut
```javascript
Tenjin.optOut()
```

### OptIn with parameters
```javascript
Tenjin.optIn(parameters)
```
Parameters:
- `parameters`: Array

### OptOut with parameters
```javascript
Tenjin.optOut(parameters)
```
Parameters:
- `parameters`: Array

### OptIn and OptOut using CMP
```javascript
Tenjin.optInOutUsingCMP()
```

### Opt out of Google DMA parameters
```javascript
Tenjin.optOutGoogleDMA()
```

### Opt in of Google DMA parameters
```javascript
Tenjin.optInGoogleDMA()
```

### Register transaction (iOS)
```javascript
transactionWithReceipt(productName, currencyCode, quantity, unitPrice, transactionId, receipt)
```
Parameters:
- `productName`: String
- `currencyCode`: String
- `quantity`: Number
- `unitPrice`: Number
- `transactionId`: String
- `receipt`: String (Base 64)

### Register transaction (Android)
```javascript
transactionWithDataSignature(productName, currencyCode, quantity, unitPrice, purchaseData, dataSignature)
```
Parameters:
- `productName`: String
- `currencyCode`: String
- `quantity`: Number
- `unitPrice`: Number
- `purchaseData`: String
- `dataSignature`: String

### Send event with name
```javascript
Tenjin.eventWithName(name)
```
Parameters:
- `name`: String

### Send event with name and value
```javascript
Tenjin.eventWithNameAndValue(name, value)
```
Parameters:
- `name`: String
- `value`: String

### LiveOps Campaigns
Tenjin supports retrieving of attributes, which are required for developers to get analytics installation id (previously known as tenjin reference id). This parameter can be used when there is no advertising id.

> [!WARNING]
> Attribution Info is a paid feature, so please contact your Tenjin account manager if you are interested in.

### Append app subversion
```javascript
Tenjin.appendAppSubversion(subversion)
```
Parameters:
- `subversion`: Number

### Customer User ID
```javascript
Tenjin.setCustomerUserId(userId)
```
Parameters:
- `userId`: string

```javascript
Tenjin.getCustomerUserId()
```
Returns: callback -> `string`

### Get Analytics Installation ID

```javascript
Tenjin.getAnalyticsInstallationId()
```
Returns: callback -> `string`

### User Profile - LiveOps Metrics

The Tenjin SDK automatically tracks user engagement metrics to help you understand player behavior and lifetime value. These metrics are collected automatically and can be accessed programmatically.

#### Automatic Tracking

The SDK automatically tracks:
- **Session metrics**: Session count, duration, first/last session dates
- **In-App Purchases (IAP)**: Transaction count, revenue by currency, purchased product IDs
- **Ad Revenue (ILRD)**: Impression-level revenue from supported ad networks

#### Get User Profile Dictionary

Retrieve the user profile as a dictionary with all metrics:

```javascript
Tenjin.getUserProfileDictionary((profile) => {
  console.log('Session Count:', profile.session_count);
  console.log('Total Session Time (ms):', profile.total_session_time);
  console.log('Average Session Length (ms):', profile.average_session_length);
  console.log('IAP Transaction Count:', profile.iap_transaction_count);
  console.log('Total ILRD Revenue USD:', profile.total_ilrd_revenue_usd);
});
```

**Dictionary Keys (Always Present):**

| Key | Type | Description |
|-----|------|-------------|
| `session_count` | `number` | Total sessions |
| `total_session_time` | `number` | Total time (milliseconds) |
| `average_session_length` | `number` | Average session (milliseconds) |
| `last_session_length` | `number` | Last session (milliseconds) |
| `iap_transaction_count` | `number` | Total IAP count |
| `total_ilrd_revenue_usd` | `number` | Total ad revenue USD |

**Dictionary Keys (Conditional - only if available):**

| Key | Type | Description |
|-----|------|-------------|
| `first_session_date` | `string` | ISO8601 formatted date |
| `last_session_date` | `string` | ISO8601 formatted date |
| `current_session_length` | `number` | Active session duration (milliseconds) |
| `iap_revenue_by_currency` | `object` | Map of currency → revenue |
| `purchased_product_ids` | `array` | Sorted array of product IDs |
| `ilrd_revenue_by_network` | `object` | Map of network → revenue |

#### Reset User Profile

Clear all user profile data (useful for testing or user logout):

```javascript
Tenjin.resetUserProfile();
```

### Impression Level Revenue Data Integration (ILRD)
Tenjin supports the ability to integrate with the Impression Level Ad Revenue (ILRD) feature from,

- AppLovin
- Unity LevelPlay
- AdMob
- TopOn
- Clever Ads Solutions (CAS)
- TradPlus

> [!WARNING]
> ILRD is a paid feature, so please contact your Tenjin account manager to discuss the price at first before sending ILRD events.

### Send Google DMA Parameters
```javascript
Tenjin.setGoogleDMAParametersWithAdPersonalization(adPersonalization, adUserData)
```
Parameters:
- `adPersonalization`: Boolean
- `adUserData`: Boolean

###  SKAdNetwork and Conversion value (iOS)

As part of <a href="https://developer.apple.com/documentation/storekit/skadnetwork">SKAdNetwork</a>, we created a wrapper method for <a href="https://developer.apple.com/documentation/storekit/skadnetwork/3919928-updatepostbackconversionvalue">`updatePostbackConversionValue(conversionValue: Integer)`</a>.
Our method will register the equivalent SKAdNetwork methods and also send the conversion values to our servers.

`updatePostbackConversionValue(conversionValue: Integer)` 6 bit value should correspond to the in-app event and shouldn’t be entered as binary representation but 0-63 integer.

As of iOS 16.1, which supports SKAdNetwork 4.0, you can now send `coarseValue` (String, with possible variants being "low", "medium" or "high") and `lockWindow` (Boolean) as parameters on the update postback method:

`updatePostbackConversionValue(conversionValue: Integer, coarseValue: String)`

`updatePostbackConversionValue(conversionValue: Integer, coarseValue: String, lockWindow: Bool)`

-   For iOS version 16.1+ which supports SKAdNetwork 4.0, you can call this method as many times as you want and can make the conversion value lower or higher than the previous value.
    
-   For iOS versions lower than 16.1 supporting SKAdnetWork versions lower than 4.0, you can call this method and our SDK will automatically detect the iOS version and update `conversionValue` only.

## Support
If you have any issues with the plugin integration or usage, please contact us to support@tenjin.com
