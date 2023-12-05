#import "Tenjin.h"
#import "TenjinSDK.h"

@implementation Tenjin
RCT_EXPORT_MODULE()

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

RCT_EXPORT_METHOD(transaction:(NSString * _Nonnull)productName
                  currencyCode:(NSString * _Nonnull)currencyCode
                  quantity:(NSInteger)quantity
                  unitPrice:(double)unitPrice)
{
    NSDecimalNumber *price = [[NSDecimalNumber alloc] initWithDouble:unitPrice];
    [TenjinSDK transactionWithProductName: productName andCurrencyCode: currencyCode andQuantity:quantity andUnitPrice: price];
}

RCT_EXPORT_METHOD(eventWithName:(NSString * _Nonnull)name)
{
    [TenjinSDK sendEventWithName:name];
}

RCT_EXPORT_METHOD(eventWithNameAndValue:(NSString * _Nonnull)name value:(NSString * _Nonnull)value)
{
    [TenjinSDK sendEventWithName:name andEventValue:value];
}

RCT_EXPORT_METHOD(appendAppSubversion:(NSNumber * _Nonnull)version)
{
    [TenjinSDK appendAppSubversion:version];
}

RCT_EXPORT_METHOD(updatePostbackConversionValue:(NSNumber * _Nonnull)conversionValue)
{
    [TenjinSDK updatePostbackConversionValue:[conversionValue intValue]];
}

RCT_EXPORT_METHOD(updatePostbackConversionValueWithCoarseValue:(NSNumber * _Nonnull)conversionValue coarseValue:(NSString * _Nonnull)coarseValue)
{
    [TenjinSDK updatePostbackConversionValue:[conversionValue intValue] coarseValue:coarseValue];
}

RCT_EXPORT_METHOD(updatePostbackConversionValueWithCoarseValueAndLockWindow:(NSNumber * _Nonnull)conversionValue coarseValue:(NSString * _Nonnull)coarseValue lockWindow:(BOOL)lockWindow)
{
    [TenjinSDK updatePostbackConversionValue:[conversionValue intValue] coarseValue:coarseValue lockWindow:lockWindow];
}

RCT_EXPORT_METHOD(getAttributionInfo:(RCTResponseSenderBlock)successCallback errorCallback: (RCTResponseSenderBlock)errorCallback)
{
    [[TenjinSDK sharedInstance] getAttributionInfo:^(NSDictionary *attributionInfo, NSError *error) {
        if(attributionInfo) {
            successCallback(@[attributionInfo]);
        } else {
            errorCallback(nil);
        }
    }];
}

RCT_EXPORT_METHOD(eventAdImpressionAdMob:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json
                                                       options:0
                                                         error:&error];
    if (! jsonData) {
        NSLog(@"Tenjin - Impression parsing error: %@", error);
    } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK adMobImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionAppLovin:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json
                                                       options:0
                                                         error:&error];
    if (! jsonData) {
        NSLog(@"Tenjin - Impression parsing error: %@", error);
    } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK appLovinImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionHyperBid:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json
                                                       options:0
                                                         error:&error];
    if (! jsonData) {
        NSLog(@"Tenjin - Impression parsing error: %@", error);
    } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK hyperBidImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionIronSource:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json
                                                       options:0
                                                         error:&error];
    if (! jsonData) {
        NSLog(@"Tenjin - Impression parsing error: %@", error);
    } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK ironSourceImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(eventAdImpressionTopOn:(NSDictionary * _Nonnull)json)
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json
                                                       options:0
                                                         error:&error];
    if (! jsonData) {
        NSLog(@"Tenjin - Impression parsing error: %@", error);
    } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        [TenjinSDK topOnImpressionFromJSON:jsonString];
    }
}

RCT_EXPORT_METHOD(setCustomerUserId:(NSString * _Nonnull)userId)
{
    [TenjinSDK setCustomerUserId:userId];
}

RCT_EXPORT_METHOD(getCustomerUserId:(RCTResponseSenderBlock)callback)
{
    callback(@[[TenjinSDK getCustomerUserId]]);
}

@end
