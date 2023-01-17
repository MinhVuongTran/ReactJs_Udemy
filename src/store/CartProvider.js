import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updateTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        // Find index cart exist
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id,
        );

        const existingCartItem = state.items[existingCartItemIndex];

        let updateItems;

        if (existingCartItem) {
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };

            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updateItem;
        } else {
            updateItems = state.items.concat(action.item);
        }

        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
        };
    }
    return defaultCartState;
};

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState,
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removerItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removerItemFromCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
