// TenjinModule.java

package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.tenjin.android.TenjinSDK;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class TenjinModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    public TenjinSDK instance = null;

    public TenjinModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Tenjin";
    }

    @ReactMethod
    public void initialize(String apiKey) {
        instance = TenjinSDK.getInstance(reactContext, apiKey);
    }

    @ReactMethod
    public void connect() {
        instance.connect();
    }

    @ReactMethod
    public void setAppStore(String type) {
        TenjinSDK.AppStoreType appStoreType = TenjinSDK.AppStoreType.googleplay;
        switch (type) {
            case "googleplay":
                appStoreType = TenjinSDK.AppStoreType.googleplay;
                break;
            case "amazon":
                appStoreType = TenjinSDK.AppStoreType.amazon;
                break;
            case "other":
                appStoreType = TenjinSDK.AppStoreType.other;
                break;
            default:
                appStoreType = TenjinSDK.AppStoreType.unspecified;
                break;
        }
        instance.setAppStore(appStoreType);
    }

    @ReactMethod
    public void optIn() {
        instance.optIn();
    }

    @ReactMethod
    public void optOut() {
        instance.optOut();
    }

    @ReactMethod
    public void optInParams(ReadableArray params) {
        instance.optInParams(readableToArray(params));
    }

    @ReactMethod
    public void optOutParams(ReadableArray params) {
        instance.optOutParams(readableToArray(params));
    }

    @ReactMethod
    public void transaction(String productName, String currencyCode, Double quantity, Double unitPrice) {
        instance.transaction(productName, currencyCode, Integer.valueOf(quantity.intValue()), unitPrice);
    }

    @ReactMethod
    public void eventWithName(String name) {
        instance.eventWithName(name);
    }

    @ReactMethod
    public void eventWithNameAndValue(String name, String value) {
        instance.eventWithNameAndValue(name, value);
    }

    @ReactMethod
    public void appendAppSubversion(Double version) {
        instance.appendAppSubversion(Integer.valueOf(version.intValue()));
    }

    @ReactMethod
    public void getAttributionInfo(com.facebook.react.bridge.Callback successCallback, com.facebook.react.bridge.Callback errorCallback) {
       instance.getAttributionInfo(data -> {
           try {
               successCallback.invoke(convertJsonToMap(new JSONObject(data)));
           } catch (JSONException e) {
               e.printStackTrace();
           }
       });
    }

    @ReactMethod
    public void eventAdImpressionAdMob(ReadableMap json) {
        try {
            instance.eventAdImpressionAdMob(convertMapToJson(json));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void eventAdImpressionAppLovin(ReadableMap json) {
        try {
            instance.eventAdImpressionAppLovin(convertMapToJson(json));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void eventAdImpressionHyperBid(ReadableMap json) {
        try {
            instance.eventAdImpressionHyperBid(convertMapToJson(json));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void eventAdImpressionIronSource(ReadableMap json) {
        try {
            instance.eventAdImpressionIronSource(convertMapToJson(json));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void eventAdImpressionTopOn(ReadableMap json) {
        try {
            instance.eventAdImpressionTopOn(convertMapToJson(json));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private String[] readableToArray(ReadableArray readableArray) {
        String[] array = new String[readableArray.size()];
        for (int i = 0; i < readableArray.size(); i++) {
            array[i] = readableArray.getString(i);
        }
        return array;
    }

    private JSONObject convertMapToJson(ReadableMap readableMap) throws JSONException {
        JSONObject object = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (readableMap.getType(key)) {
                case Null:
                    object.put(key, JSONObject.NULL);
                    break;
                case Boolean:
                    object.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    object.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    object.put(key, readableMap.getString(key));
                    break;
                case Map:
                    object.put(key, convertMapToJson(readableMap.getMap(key)));
                    break;
                case Array:
                    object.put(key, convertArrayToJson(readableMap.getArray(key)));
                    break;
            }
        }
        return object;
    }

    private JSONArray convertArrayToJson(ReadableArray readableArray) throws JSONException {
        JSONArray array = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            switch (readableArray.getType(i)) {
                case Null:
                    break;
                case Boolean:
                    array.put(readableArray.getBoolean(i));
                    break;
                case Number:
                    array.put(readableArray.getDouble(i));
                    break;
                case String:
                    array.put(readableArray.getString(i));
                    break;
                case Map:
                    array.put(convertMapToJson(readableArray.getMap(i)));
                    break;
                case Array:
                    array.put(convertArrayToJson(readableArray.getArray(i)));
                    break;
            }
        }
        return array;
    }

    public WritableMap convertJsonToMap(JSONObject jsonObject) throws JSONException {
        WritableMap map = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
                if (("option_values").equals(key)) {
                    map.putArray("options", convertJsonToArray((JSONArray) value));
                }
            } else if (value instanceof Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                map.putDouble(key, (Double) value);
            } else if (value instanceof String) {
                map.putString(key, (String) value);
            } else {
                map.putString(key, value.toString());
            }
        }
        return map;
    }

    public WritableArray convertJsonToArray(JSONArray jsonArray) throws JSONException {
        WritableArray array = new WritableNativeArray();

        for (int i = 0; i < jsonArray.length(); i++) {
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                array.pushMap(this.convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof Double) {
                array.pushDouble((Double) value);
            } else if (value instanceof String) {
                array.pushString((String) value);
            } else {
                array.pushString(value.toString());
            }
        }
        return array;
    }
}