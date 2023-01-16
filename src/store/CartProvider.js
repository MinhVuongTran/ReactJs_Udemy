import CartContext from './cart-context';

function CartProvider(props) {
    const addItemToCartHandler = (item) => {};

    const removerItemFromCartHandler = (id) => {};

    const cartContext = {
        items: [],
        totalAmount: 0,
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
