import Foundation
import StoreKit
import TenjinSDK

@available(iOS 15.0, *)
@objc(TenjinStoreKit) public class TenjinStoreKit: NSObject {
  @objc public static func handleSubscription(
    productId: String,
    currencyCode: String,
    unitPrice: NSDecimalNumber,
    completion: @escaping (Bool, String?) -> Void
  ) {
    Task {
      guard let verificationResult = await Transaction.latest(for: productId) else {
        completion(false, "No transaction found for product: \(productId)")
        return
      }

      let transaction: Transaction
      switch verificationResult {
      case .verified(let tx):
        transaction = tx
      case .unverified(let tx, _):
        transaction = tx
      }

      let transactionId = String(transaction.id)
      let originalTransactionId = String(transaction.originalID)

      let jsonRepresentation: String
      if let jsonString = String(data: transaction.jsonRepresentation, encoding: .utf8) {
        jsonRepresentation = jsonString
      } else {
        jsonRepresentation = ""
      }
      
      let jws = verificationResult.jwsRepresentation

      TenjinSDK.subscription(
        withProductName: productId,
        andCurrencyCode: currencyCode,
        andUnitPrice: unitPrice,
        andTransactionId: transactionId,
        andOriginalTransactionId: originalTransactionId,
        andBase64Receipt: jws,
        andSKTransaction: jsonRepresentation
      )

      completion(true, nil)
    }
  }
}
