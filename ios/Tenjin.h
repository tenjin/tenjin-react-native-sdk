#ifdef RCT_NEW_ARCH_ENABLED
#import <TenjinSpec/TenjinSpec.h>

@interface Tenjin : NSObject <NativeTenjinSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Tenjin : NSObject <RCTBridgeModule>
#endif

@end
