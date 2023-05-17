
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTenjinSpec.h"

@interface Tenjin : NSObject <NativeTenjinSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Tenjin : NSObject <RCTBridgeModule>
#endif

@end
