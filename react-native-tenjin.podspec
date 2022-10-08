# react-native-tenjin.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-tenjin"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://tenjin.com"
  s.license      = "MIT"
  s.authors      = { "Tenjin" => "engineering@tenjin.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/tenjin/tenjin-react-native-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.xcconfig = { "OTHER_LINKER_FLAGS" => "-ObjC -all_load" }
  #s.ios.vendored_frameworks = "ios/libTenjinSDKUniversal.a"
  s.static_framework = true
  s.dependency "React"
  s.dependency "TenjinSDK", "1.12.18"
end

