import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Parses cost to a float, removing any non-numeric characters
    const parseItemCost = (itemCost) => {
        return parseFloat(itemCost.replace(/[^0-9.]/g, '')) || 0;
    };

    // Calculates total cart amount
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + parseItemCost(item.cost) * item.quantity, 0).toFixed(2);
    };

    // Handles incrementing item quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
    };

    // Handles decrementing item quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item));
        }
    };

    // Calculates total cost for a single item
    const calculateItemTotal = (item) => {
        return (parseItemCost(item.cost) * item.quantity).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={`${item.name}-${item.cost}-${item.image}`}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateItemTotal(item)}</div>
                            <button className="cart-item-delete" onClick={() => dispatch(removeItem(item))}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-actions">
                <button className="cart-button continue" onClick={onContinueShopping}>Continue Shopping</button>
                <button className="cart-button checkout" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
