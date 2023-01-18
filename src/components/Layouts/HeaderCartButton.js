import React, { useContext, useEffect, useState } from 'react';
import cartContext from '../../store/cart-context';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighLighted] = useState(false);

    const cartCtx = useContext(cartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ''
    }`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setBtnIsHighLighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighLighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
