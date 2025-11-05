#import "Tenjin.h"
#import "TenjinSDK.h"

@implementation Tenjin

RCT_EXPORT_MODULE(Tenjin)

RCT_EXPORT_METHOD(initialize:(NSString * _Nonnull)apiKey)
{
    [TenjinSDK getInstance:apiKey];
}

RCT_EXPORT_METHOD(connect)
{
    [TenjinSDK connect];
}

RCT_EXPORT_METHOD(optIn)
{
    [TenjinSDK optIn];
}

RCT_EXPORT_METHOD(optOut)
{
    [TenjinSDK optOut];
}

RCT_EXPORT_METHOD(optInParams:(NSArray * _Nonnull)params)
{
    [TenjinSDK optInParams:params];
}

RCT_EXPORT_METHOD(optOutParams:(NSArray * _Nonnull)params)
{
    [TenjinSDK optOutParams:params];
}

RCT_EXPORT_METHOD(optInOutUsingCMP)
{
    [TenjinSDK optInOutUsingCMP];
}

RCT_EXPORT_METHOD(optOutGoogleDMA)
{
    [TenjinSDK optOutGoogleDMA];
}

RCT_EXPORT_METHOD(optInGoogleDMA)
{
    [TenjinSDK optInGoogleDMA];
}

RCT_EXPORT_METHOD(transaction:(NSString * _Nonnull)productName
                  currencyCode:(NSString * _Nonnull)currencyCode
                  quantity:(double)quantity
                  unitPrice:(double)unitPrice)
{
    NSDecimalNumber *price = [[NSDecimalNumber alloc] initWithDouble:unitPrice];
    NSInteger quantityNumber = quantity;
    [TenjinSDK transactionWithProductName:productName
                         andCurrencyCode:currencyCode
                             andQuantity:quantityNumber
                             andUnitPrice:price];
}

RCT_EXPORT_METHOD(transactionWithReceipt:(NSString * _Nonnull)productName
                  currencyCode:(NSString * _Nonnull)currencyCode
                  quantity:(double)quantity
                  unitPrice:(double)unitPrice
                  transaction:(NSString * _Nonnull)transaction
                  data:(NSString * _Nonnull)data)
{
    NSDecimalNumber *price = [[NSDecimalNumber alloc] initWithDouble:unitPrice];
    NSInteger quantityNumber = quantity;
    [TenjinSDK transactionWithProductName:productName
                         andCurrencyCode:currencyCode
                              andQuantity:quantityNumber
                             andUnitPrice:price
                         andTransactionId:transaction
                         andBase64Receipt:data];
}

RCT_EXPORT_METHOD(transactionWithDataSignature:(NSString * _Nonnull)productName
                  currencyCode:(NSString * _Nonnull)currencyCode
                  quantity:(double)quantity
                  unitPrice:(double)unitPrice
                  purchaseData:(NSString * _Nonnull)purchaseData
                  dataSignature:(NSString * _Nonnull)dataSignature)
{
}

RCT_EXPORT_METHOD(eventWithName:(NSString * _Nonnull)name)
{
    [TenjinSDK sendEventWithName:name];
}

RCT_EXPORT_METHOD(eventWithNameAndValue:(NSString * _Nonnull)name value:(NSString * _Nonnull)value)
{
    [TenjinSDK sendEventWithName:name andEventValue:value];
}

RCT_EXPORT_METHOD(appendAppSubversion:(double)version)
{
    [TenjinSDK appendAppSubversion:[[NSNumber alloc] initWithDouble:version]];
}

RCT_EXPORT_METHOD(updatePostbackConversionValue:(double)conversionValue)
{
    [TenjinSDK updatePostbackConversionValue:(int)conversionValue];
}

RCT_EXPORT_METHOD(updatePostbackConversionValueWithCoarseValue:(double)conversionValue
                  coarseValue:(NSString * _Nonnull)coarseValue)
{
    [TenjinSDK updatePostbackConversionValue:(int)conversionValue coarseValue:coarseValue];
}

RCT_EXPORT_METHOD(updatePostbackConversionValueWithCoarseValueAndLockWindow:(double)conversionValue
                  coarseValue:(NSString * _Nonnull)coarseValue
                  lockWindow:(BOOL)lockWindow)
{
    [TenjinSDK updatePostbackConversionValue:(int)conversionValue
                                coarseValue:coarseValue
                                 lockWindow:lockWindow];
}

RCT_EXPORT_METHOD(getAttributionInfo:(RCTResponseSenderBlock)successCallback
                  errorCallback:(RCTResponseSenderBlock)errorCallback)
{
    [[TenjinSDK sharedInstance] getAttributionInfo:^(NSDictionary *attributionInfo, NSError *error) {
        if (error) {
            errorCallback(@[error.localizedDescription ?: @"Unknown error"]);
            return;
        }
        if (attributionInfo) {
            successCallback(@[attributionInfo]);
        } else {
            errorCallback(@[@"No attribution info available"]);
        }
    }];
}

RCT_EXPORT_METHOD(eventAdImpressionAdMob:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:&error];
    if (jsonData) {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK adMobImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionAppLovin:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:&error];
    if (jsonData) {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK appLovinImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionHyperBid:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:&error];
    if (jsonData) {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK hyperBidImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionIronSource:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:&error];
    if (jsonData) {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK ironSourceImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionTopOn:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:&error];
    if (jsonData) {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK topOnImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionTradPlus:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:0 error:&error];
    if (jsonData) {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK tradPlusImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(setCustomerUserId:(NSString * _Nonnull)userId)
{
    [TenjinSDK setCustomerUserId:userId];
}

RCT_EXPORT_METHOD(getCustomerUserId:(RCTResponseSenderBlock)callback)
{
    if (callback) {
        NSString *userId = [TenjinSDK getCustomerUserId];
        callback(@[userId ?: @""]);
    }
}

RCT_EXPORT_METHOD(getAnalyticsInstallationId:(RCTResponseSenderBlock)callback)
{
    if (callback) {
        NSString *installationId = [TenjinSDK getAnalyticsInstallationId];
        callback(@[installationId ?: @""]);
    }
}

RCT_EXPORT_METHOD(setGoogleDMAParameters:(BOOL)adPersonalization adUserData:(BOOL)adUserData)
{
    [[TenjinSDK sharedInstance] setGoogleDMAParametersWithAdPersonalization:adPersonalization
                                                                 adUserData:adUserData];
}

RCT_EXPORT_METHOD(setCacheEventSetting:(BOOL)setting)
{
    [TenjinSDK setCacheEventSetting:setting];
}

RCT_EXPORT_METHOD(setEncryptRequestsSetting:(BOOL)setting)
{
    [TenjinSDK setEncryptRequestsSetting:setting];
}

RCT_EXPORT_METHOD(setAppStore:(NSString *)type)
{
  // Nothing to implement
}


#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTenjinSpecJSI>(params);
}
#endif

@end
