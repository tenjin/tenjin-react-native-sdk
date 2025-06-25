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

### Register transaction
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

### Impression Level Revenue Data Integration (ILRD)
Tenjin supports the ability to integrate with the Impression Level Ad Revenue (ILRD) feature from,

- AppLovin
- Unity LevelPlay
- AdMob
- TopOn
- Clever Ads Solutions (CAS)
- TradPlus
This feature allows you to receive events which correspond to your ad revenue is affected by each advertisement show to a user. To enable this feature, follow the below instructions.

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
