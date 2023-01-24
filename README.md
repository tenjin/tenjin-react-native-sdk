# React Native Tenjin Plugin

# Summary
Tenjin's SDK allows users to track events and installs in their apps. To learn more about Tenjin and our product offering, please visit https://www.tenjin.com.

### Notes:

On iOS:
For AppTrackingTransparency, be sure to update your project `.plist` file and add `NSUserTrackingUsageDescription` along with the text message you want to display to users. This library is only available in iOS 14.0+. For further information on this, you can check our [iOS documentation](https://github.com/tenjin/tenjin-ios-sdk#-skadnetwork-and-ios-15-advertiser-postbacks)
  
On Android:
You will need to add [Google's Install Referrer Library](https://developer.android.com/google/play/installreferrer/library.html) to your gradle dependencies. If you haven’t already installed the [Google Play Services](https://developers.google.com/android/guides/setup) you also need to add it
```gradle
dependencies {
  classpath("com.android.installreferrer:installreferrer:1.1.2")
  classpath("com.google.android.gms:play-services-analytics:17.0.0")
}
```

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

### Register transaction
```javascript
transaction(productName, currencyCode, quantity, unitPrice)
```
Parameters:
- `productName`: String
- `currencyCode`: String
- `quantity`: Number
- `unitPrice`: Number

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

### Append app subversion
```javascript
Tenjin.appendAppSubversion(subversion)
```
Parameters:
- `subversion`: Number

### <a id="ilrd"></a>Impression Level Ad Revenue Integration

Tenjin supports the ability to integrate with the Impression Level Ad Revenue (ILRD) feature from,
- AppLovin
- IronSource
- HyperBid
- AdMob
- TopOn

This feature allows you to receive events which correspond to your ad revenue that is affected by each advertisement show to a user. To enable this feature, follow the below instructions.

:warning: **NOTE: ILRD is a paid feature, so please contact your Tenjin account manager to discuss the price at first before sending ILRD events.**

### <a id="attributionInfo"></a>Attribution Info

Tenjin supports retrieving of attributes, which are required for developers to get analytics installation id (previously known as tenjin reference id). This parameter can be used when there is no advertising id.

:warning: **NOTE: Attribution Info is a paid feature, so please contact your Tenjin account manager if you are interested in.**

## Support
If you have any issues with the plugin integration or usage, please contact us to support@tenjin.com
