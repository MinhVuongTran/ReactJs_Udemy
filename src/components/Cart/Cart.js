import { useContext } from 'react';

import Modal from '../UI/Modal';
import cartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem';

function Cart(props) {
    const cartCtx = useContext(cartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasIsItem = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {};

    const cartItemRemoveHandler = (id) => {};

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={cartItemAddHandler.bind(null, item.id)}
                    onRemove={cartItemRemoveHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes['button--alt']}
                    onClick={props.onClose}>
                    Close
                </button>
                {hasIsItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;
