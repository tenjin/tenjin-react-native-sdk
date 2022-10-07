# React Native Tenjin Plugin

# Summary

The Tenjin iOS SDK allows users to track events and installs in their iOS apps. To learn more about Tenjin and our product offering, please visit https://www.tenjin.com.

### Notes:

On iOS:
- For AppTrackingTransparency, be sure to update your project `.plist` file and add `Privacy - Tracking Usage Description` <a href="https://developer.apple.com/documentation/bundleresources/information_property_list/nsusertrackingusagedescription" target="_new">(NSUserTrackingUsageDescription)</a> along with the text message you want to display to users. This library is only available in iOS 14.0+.
- For <a href="https://developer.apple.com/documentation/iad/setting_up_apple_search_ads_attribution" target="_new">Apple Search Ads Attribution</a> support, please be sure to upgrade to v1.12.6+ and add the `AdServices.framework` library. This library is only available in iOS 14.3+.
  
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

### Get attribution info
```javascript
Tenjin.getAttributionInfo(
    (success) => {
        console.log(`Attibution info found! ${success}`);
    },
    () => {
        console.error(`Attribution info failed`);
    }
)
```
Parameters:
- `successCallback`: Callback
- `errorCallback`: Callback

### Append app subversion
```javascript
Tenjin.appendAppSubversion(subversion)
```
Parameters:
- `subversion`: Number

### Send AdMob impression (ILRD)
```javascript
Tenjin.eventAdImpressionAdMob(json)
```
Parameters:
- `json`: JSON

### Send AppLovin impression (ILRD)
```javascript
Tenjin.eventAdImpressionAppLovin(json)
```
Parameters:
- `json`: JSON

### Send HyperBid impression (ILRD)
```javascript
Tenjin.eventAdImpressionHyperBid(json)
```
Parameters:
- `json`: JSON

### Send IronSource impression (ILRD)
```javascript
Tenjin.eventAdImpressionIronSource(json)
```
Parameters:
- `json`: JSON

### Send TopOn impression (ILRD)
```javascript
Tenjin.eventAdImpressionTopOn(json)
```
Parameters:
- `json`: JSON

## Support
If you have any issues with the plugin integration or usage, please contact us to support@tenjin.com
