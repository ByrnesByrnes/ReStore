import { createContext, PropsWithChildren, useContext, useState } from "react";
import { BasketItem } from "../modules/basket/interfaces/basket-item";

interface StoreContextValue {
    basket: BasketItem[] | null;
    setBasket: (basket: BasketItem[]) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error("Oops - we do not seem to be inside the provider");
    }

    return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<BasketItem[] | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;

        const items: BasketItem[] = [...basket];

        const itemIndex = items.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;

            if (items[itemIndex].quantity <= 0) {
                items.splice(itemIndex, 1);
            }

            setBasket(items);
        }

    }

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    );
}