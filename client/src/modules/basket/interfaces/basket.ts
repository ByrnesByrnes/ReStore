import { BasketItem } from "./basket-item";

export interface Basket {
    buyId: string;
    id: number;
    items: { $values: BasketItem[] };
}