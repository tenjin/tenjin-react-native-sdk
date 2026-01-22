package com.tenjin

import com.facebook.react.bridge.*
import com.tenjin.android.TenjinSDK
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.util.concurrent.atomic.AtomicBoolean

class TenjinModule internal constructor(private val reactContext: ReactApplicationContext): NativeTenjinSpec(reactContext)  {
  companion object {
    const val NAME = "Tenjin"
  }

  override fun getName(): String = NAME
  private var instance: TenjinSDK? = null

  @ReactMethod
  override fun initialize(apiKey: String) {
    instance = TenjinSDK.getInstance(reactContext, apiKey)
  }

  @ReactMethod
  override fun connect() {
    instance?.connect()
  }

  @ReactMethod
  override fun setAppStore(type: String) {
    val appStoreType = when (type) {
      "googleplay" -> TenjinSDK.AppStoreType.googleplay
      "amazon" -> TenjinSDK.AppStoreType.amazon
      "other" -> TenjinSDK.AppStoreType.other
      else -> TenjinSDK.AppStoreType.unspecified
    }
    instance?.setAppStore(appStoreType)
  }

  @ReactMethod
  override fun optIn() {
    instance?.optIn()
  }

  @ReactMethod
  override fun optOut() {
    instance?.optOut()
  }

  @ReactMethod
  override fun optInParams(params: ReadableArray) {
    instance?.optInParams(readableToArray(params))
  }

  @ReactMethod
  override fun optOutParams(params: ReadableArray) {
    instance?.optOutParams(readableToArray(params))
  }

  @ReactMethod
  override fun optInOutUsingCMP() {
    instance?.optInOutUsingCMP()
  }

  @ReactMethod
  override fun optOutGoogleDMA() {
    instance?.optOutGoogleDMA()
  }

  @ReactMethod
  override fun optInGoogleDMA() {
    instance?.optInGoogleDMA()
  }

  @ReactMethod
  override fun transaction(productName: String, currencyCode: String, quantity: Double, unitPrice: Double) {
    instance?.transaction(productName, currencyCode, quantity.toInt(), unitPrice)
  }

  @ReactMethod
  override fun transactionWithReceipt(
    productName: String,
    currencyCode: String,
    quantity: Double,
    unitPrice: Double,
    transaction: String,
    data: String
  ) {
    instance?.transaction(productName, currencyCode, quantity.toInt(), unitPrice, transaction, data)
  }

  @ReactMethod
  override fun transactionWithDataSignature(
    productName: String,
    currencyCode: String,
    quantity: Double,
    unitPrice: Double,
    purchaseData: String,
    dataSignature: String
  ) {
    instance?.transaction(productName, currencyCode, quantity.toInt(), unitPrice, purchaseData, dataSignature)
  }

  @ReactMethod
  override fun eventWithName(name: String) {
    instance?.eventWithName(name)
  }

  @ReactMethod
  override fun eventWithNameAndValue(name: String, value: String) {
    instance?.eventWithNameAndValue(name, value)
  }

  @ReactMethod
  override fun appendAppSubversion(version: Double) {
    instance?.appendAppSubversion(version.toInt())
  }

  @ReactMethod
  override fun getAttributionInfo(successCallback: Callback, errorCallback: Callback) {
    val callbackInvoked = AtomicBoolean(false)
    instance?.getAttributionInfo { data ->
      if (!callbackInvoked.getAndSet(true)) {
        try {
          successCallback.invoke(convertJsonToMap(JSONObject(data as Map<String, Any>)))
        } catch (e: JSONException) {
          errorCallback.invoke("JSON Parsing Error: ${e.message}")
        }
      }
    }
  }

  @ReactMethod
  override fun eventAdImpressionAdMob(json: ReadableMap) {
    try {
      instance?.eventAdImpressionAdMob(convertMapToJson(json))
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  override fun eventAdImpressionAppLovin(json: ReadableMap) {
    try {
      instance?.eventAdImpressionAppLovin(convertMapToJson(json))
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  override fun eventAdImpressionHyperBid(json: ReadableMap) {
    try {
      instance?.eventAdImpressionHyperBid(convertMapToJson(json))
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  override fun eventAdImpressionIronSource(json: ReadableMap) {
    try {
      instance?.eventAdImpressionIronSource(convertMapToJson(json))
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  override fun eventAdImpressionTopOn(json: ReadableMap) {
    try {
      instance?.eventAdImpressionTopOn(convertMapToJson(json))
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  override fun eventAdImpressionTradPlus(json: ReadableMap) {
    try {
      instance?.eventAdImpressionTradPlus(convertMapToJson(json))
    } catch (e: JSONException) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  override fun setCustomerUserId(userId: String) {
    instance?.setCustomerUserId(userId)
  }

  @ReactMethod
  override fun getCustomerUserId(callback: Callback) {
    callback.invoke(instance?.customerUserId ?: "")
  }

  @ReactMethod
  override fun getAnalyticsInstallationId(callback: Callback) {
    callback.invoke(instance?.analyticsInstallationId ?: "")
  }

  @ReactMethod
  override fun setGoogleDMAParameters(adPersonalization: Boolean, adUserData: Boolean) {
    instance?.setGoogleDMAParameters(adPersonalization, adUserData)
  }

  @ReactMethod
  override fun setCacheEventSetting(setting: Boolean) {
    instance?.setCacheEventSetting(setting)
  }

  @ReactMethod
  override fun setEncryptRequestsSetting(setting: Boolean) {
    instance?.setEncryptRequestsSetting(setting)
  }

  @ReactMethod
  override fun updatePostbackConversionValue(conversionValue: Double) {
    // Nothing to implement
  }

  @ReactMethod
  override fun updatePostbackConversionValueWithCoarseValue(conversionValue: Double, coarseValue: String) {
    // Nothing to implement
  }

  @ReactMethod
  override fun updatePostbackConversionValueWithCoarseValueAndLockWindow(conversionValue: Double, coarseValue: String, lockWindow: Boolean) {
    // Nothing to implement
  }

  @ReactMethod
  override fun getUserProfileDictionary(callback: Callback) {
    val profileDict = instance?.getUserProfileDictionary()
    if (profileDict != null) {
      try {
        val writableMap = convertMapToWritableMap(profileDict)
        callback.invoke(writableMap)
      } catch (e: Exception) {
        callback.invoke(WritableNativeMap())
      }
    } else {
      callback.invoke(WritableNativeMap())
    }
  }

  @ReactMethod
  override fun resetUserProfile() {
    instance?.resetUserProfile()
  }

  private fun convertMapToWritableMap(map: Map<String, Any>): WritableMap {
    val writableMap = WritableNativeMap()
    for ((key, value) in map) {
      when (value) {
        is Map<*, *> -> writableMap.putMap(key, convertMapToWritableMap(value as Map<String, Any>))
        is List<*> -> writableMap.putArray(key, convertListToWritableArray(value))
        is Boolean -> writableMap.putBoolean(key, value)
        is Int -> writableMap.putInt(key, value)
        is Long -> writableMap.putDouble(key, value.toDouble())
        is Double -> writableMap.putDouble(key, value)
        is String -> writableMap.putString(key, value)
        else -> writableMap.putString(key, value.toString())
      }
    }
    return writableMap
  }

  private fun convertListToWritableArray(list: List<*>): WritableArray {
    val writableArray = WritableNativeArray()
    for (value in list) {
      when (value) {
        is Map<*, *> -> writableArray.pushMap(convertMapToWritableMap(value as Map<String, Any>))
        is List<*> -> writableArray.pushArray(convertListToWritableArray(value))
        is Boolean -> writableArray.pushBoolean(value)
        is Int -> writableArray.pushInt(value)
        is Long -> writableArray.pushDouble(value.toDouble())
        is Double -> writableArray.pushDouble(value)
        is String -> writableArray.pushString(value)
        else -> writableArray.pushString(value.toString())
      }
    }
    return writableArray
  }

  private fun readableToArray(readableArray: ReadableArray): Array<String> {
    return Array(readableArray.size()) { readableArray.getString(it) ?: "" }
  }

  private fun convertMapToJson(readableMap: ReadableMap): JSONObject {
    val jsonObject = JSONObject()
    val iterator = readableMap.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (readableMap.getType(key)) {
        ReadableType.Null -> jsonObject.put(key, JSONObject.NULL)
        ReadableType.Boolean -> jsonObject.put(key, readableMap.getBoolean(key))
        ReadableType.Number -> jsonObject.put(key, readableMap.getDouble(key))
        ReadableType.String -> jsonObject.put(key, readableMap.getString(key))
        ReadableType.Map -> jsonObject.put(key, convertMapToJson(readableMap.getMap(key)!!))
        ReadableType.Array -> jsonObject.put(key, convertArrayToJson(readableMap.getArray(key)!!))
      }
    }
    return jsonObject
  }

  private fun convertArrayToJson(readableArray: ReadableArray): JSONArray {
    val jsonArray = JSONArray()
    for (i in 0 until readableArray.size()) {
      when (readableArray.getType(i)) {
        ReadableType.Null -> jsonArray.put(JSONObject.NULL)
        ReadableType.Boolean -> jsonArray.put(readableArray.getBoolean(i))
        ReadableType.Number -> jsonArray.put(readableArray.getDouble(i))
        ReadableType.String -> jsonArray.put(readableArray.getString(i))
        ReadableType.Map -> {
          readableArray.getMap(i)?.let { map ->
            jsonArray.put(convertMapToJson(map))
          } ?: jsonArray.put(JSONObject.NULL)
        }
        ReadableType.Array -> {
          readableArray.getArray(i)?.let { array ->
            jsonArray.put(convertArrayToJson(array))
          } ?: jsonArray.put(JSONObject.NULL)
        }
      }
    }
    return jsonArray
  }

  private fun convertJsonToMap(jsonObject: JSONObject): WritableMap {
    val map = WritableNativeMap()
    val iterator = jsonObject.keys()
    while (iterator.hasNext()) {
      val key = iterator.next()
      val value = jsonObject[key]
      when (value) {
        is JSONObject -> map.putMap(key, convertJsonToMap(value))
        is JSONArray -> map.putArray(key, convertJsonToArray(value))
        is Boolean -> map.putBoolean(key, value)
        is Int -> map.putInt(key, value)
        is Double -> map.putDouble(key, value)
        is String -> map.putString(key, value)
        else -> map.putString(key, value.toString())
      }
    }
    return map
  }

  private fun convertJsonToArray(jsonArray: JSONArray): WritableArray {
    val array = WritableNativeArray()
    for (i in 0 until jsonArray.length()) {
      when (val value = jsonArray[i]) {
        is JSONObject -> array.pushMap(convertJsonToMap(value))
        is JSONArray -> array.pushArray(convertJsonToArray(value))
        is Boolean -> array.pushBoolean(value)
        is Int -> array.pushInt(value)
        is Double -> array.pushDouble(value)
        is String -> array.pushString(value)
        else -> array.pushString(value.toString())
      }
    }
    return array
  }
}

