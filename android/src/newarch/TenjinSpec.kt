package com.tenjin

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

abstract class TenjinSpec internal constructor(context: ReactApplicationContext) : NativeTenjinSpec(context) {
    abstract override fun getName(): String
    abstract override fun initialize(apiKey: String)
    abstract override fun connect()
    abstract override fun setAppStore(type: String)
    abstract override fun optIn()
    abstract override fun optOut()
    abstract override fun optInParams(params: ReadableArray)
    abstract override fun optOutParams(params: ReadableArray)
    abstract override fun optInOutUsingCMP()
    abstract override fun optOutGoogleDMA()
    abstract override fun optInGoogleDMA()
    abstract override fun transaction(productName: String, currencyCode: String, quantity: Double, unitPrice: Double)
    abstract override fun transactionWithReceipt(
        productName: String,
        currencyCode: String,
        quantity: Double,
        unitPrice: Double,
        transaction: String,
        data: String
    )
    abstract override fun eventWithName(name: String)
    abstract override fun eventWithNameAndValue(name: String, value: String)
    abstract override fun appendAppSubversion(version: Double)
    abstract override fun getAttributionInfo(successCallback: Callback, errorCallback: Callback)
    abstract override fun eventAdImpressionAdMob(json: ReadableMap)
    abstract override fun eventAdImpressionAppLovin(json: ReadableMap)
    abstract override fun eventAdImpressionHyperBid(json: ReadableMap)
    abstract override fun eventAdImpressionIronSource(json: ReadableMap)
    abstract override fun eventAdImpressionTopOn(json: ReadableMap)
    abstract override fun eventAdImpressionTradPlus(json: ReadableMap)
    abstract override fun setCustomerUserId(userId: String)
    abstract override fun getCustomerUserId(callback: Callback)
    abstract override fun getAnalyticsInstallationId(callback: Callback)
    abstract override fun setGoogleDMAParameters(adPersonalization: Boolean, adUserData: Boolean)
}
