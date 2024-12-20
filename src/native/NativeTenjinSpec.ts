import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    initialize(apiKey: string): void;
    connect(): void;
    optIn(): void;
    optOut(): void;
    optInParams(params: string[]): void;
    optOutParams(params: string[]): void;
    transaction(productName: string, currencyCode: string, quantity: number, unitPrice: number): void;
    transactionWithReceipt(
        productName: string,
        currencyCode: string,
        quantity: number,
        unitPrice: number,
        transaction: string,
        data: string
    ): void;
    eventWithName(name: string): void;
    eventWithNameAndValue(name: string, value: string): void;
    appendAppSubversion(version: number): void;
    updatePostbackConversionValue(conversionValue: number): void;
    updatePostbackConversionValueWithCoarseValue(
        conversionValue: number,
        coarseValue: string
    ): void;
    updatePostbackConversionValueWithCoarseValueAndLockWindow(
        conversionValue: number,
        coarseValue: string,
        lockWindow: boolean
    ): void;
    setCustomerUserId(userId: string): void;
    getCustomerUserId(callback: (userId: string) => void): void;
    getAnalyticsInstallationId(callback: (id: string) => void): void;
}

export default TurboModuleRegistry.get<Spec>('Tenjin');