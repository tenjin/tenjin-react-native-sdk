// Tenjin.m

#import "Tenjin.h"
#import "TenjinSDK.h"

@implementation Tenjin

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(initialize:(NSString *)apiKey)
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

RCT_EXPORT_METHOD(optInParams:(NSArray *)params)
{
    [TenjinSDK optInParams:params];
}

RCT_EXPORT_METHOD(optOutParams:(NSArray *)params)
{
    [TenjinSDK optOutParams:params];
}

RCT_EXPORT_METHOD(transaction:(NSString *)productName
                  currencyCode:(NSString *)currencyCode
                  quantity:(NSInteger)quantity
                  unitPrice:(double)unitPrice)
{
    NSDecimalNumber *price = [[NSDecimalNumber alloc] initWithDouble:unitPrice];
    [TenjinSDK transactionWithProductName: productName andCurrencyCode: currencyCode andQuantity:quantity andUnitPrice: price];
}

RCT_EXPORT_METHOD(eventWithName:(NSString *)name)
{
    [TenjinSDK sendEventWithName:name];
}

RCT_EXPORT_METHOD(eventWithNameAndValue:(NSString *)name value:(NSString *)value)
{
    [TenjinSDK sendEventWithName:name andEventValue:value];
}

RCT_EXPORT_METHOD(appendAppSubversion:(NSNumber *)version)
{
    [TenjinSDK appendAppSubversion:version];
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

RCT_EXPORT_METHOD(eventAdImpressionAdMob:(NSDictionary *)json)
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

RCT_EXPORT_METHOD(eventAdImpressionAppLovin:(NSDictionary *)json)
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

RCT_EXPORT_METHOD(eventAdImpressionHyperBid:(NSDictionary *)json)
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

RCT_EXPORT_METHOD(eventAdImpressionIronSource:(NSDictionary *)json)
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

RCT_EXPORT_METHOD(eventAdImpressionTopOn:(NSDictionary *)json)
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

@end
