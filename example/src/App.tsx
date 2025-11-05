import { StyleSheet, View, Button } from 'react-native';
import Tenjin from 'react-native-tenjin';
import { NativeModules } from 'react-native';

console.log('[Tenjin]: NativeModules.Tenjin:', NativeModules.Tenjin);

export default function App() {
  console.log(Tenjin);

  return (
    <View style={styles.container}>
      <Button
    title="Initialize"
    onPress={() => {
      Tenjin.initialize("YOUR_SDK_KEY")
      Tenjin.setCacheEventSetting(true)
      Tenjin.setEncryptRequestsSetting(true)
    }}
  />
  <Button
    title="Connect"
    onPress={() => Tenjin.connect()}
  />
  <Button
    title="Set AppStore"
    onPress={() => Tenjin.setAppStore("googleplay")}
  />
  <Button
    title="Opt In"
    onPress={() => Tenjin.optIn()}
  />
  <Button
    title="Opt Out"
    onPress={() => Tenjin.optOut()}
  />
  <Button
    title="Send event"
    onPress={() => Tenjin.eventWithName("TenjinTestEvent")}
  />
  <Button
    title="Transaction"
    onPress={() => Tenjin.transactionWithDataSignature(
      'test_product',
      'USD',
      1,
      4.99,
      'purchase_data',
      'signature'
    )}
  />
  <Button
    title="Send event with value"
    onPress={() => Tenjin.eventWithNameAndValue("TenjinTestEvent", "2")}
  />
  <Button
    title="Update postback (SKAN)"
    onPress={() => Tenjin.updatePostbackConversionValue(2, "medium", true)}
  />
  <Button
    title="Set customer user id"
    onPress={() => Tenjin.setCustomerUserId("Test_RN_Tenjin")}
  />
  <Button
    title="Get customer user id"
    onPress={() => Tenjin.getCustomerUserId(
      (userId: string) => {
        console.log(`Customer User ID: ${userId}`);
      }
    )}
  />
  <Button
    title="Get analytics installation ID"
    onPress={() => Tenjin.getAnalyticsInstallationId(
      (id: string) => {
        console.log(`Analytics Installation ID: ${id}`);
      }
    )}
  />
  <Button
    title="Attribution Info"
    onPress={() => Tenjin.getAttributionInfo(
      (info) => {
        console.log(`Attribution info found!`, info);
      },
      (error) => {
        console.error(`Attribution info failed:`, error);
      }
    )}
  />
  <Button
    title="AppLovin Impression"
    onPress={() => Tenjin.eventAdImpressionAppLovin({json: {
      "format": "Banner",
      "revenue_precision": "exact",
      "ad_unit_id": "123456789",
      "network_placement": "banner_regular",
      "placement": "",
      "publisher_revenue_decimal": "0",
      "ad_revenue_currency": "USD",
      "revenue": "0",
      "creative_id": "1234567",
      "publisher_revenue_micro": "0",
      "network_name": "AppLovin"
    }})}
  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
