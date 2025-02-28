import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);  // Get cart items from Redux store
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.quantity * parseFloat(item.cost.substring(1)); // Remove '$' and calculate total
    });
    return total.toFixed(2); // Return total rounded to 2 decimal places
  };

  // Handle Continue Shopping button click
  const handleContinueShopping = (e) => {
    onContinueShopping(e);  // Call the parent function to return to the plant listing page
  };

  // Handle incrementing the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));  // Increase quantity by 1
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));  // Decrease quantity by 1
    } else {
      dispatch(removeItem(item.name));  // Remove item if quantity drops to 0
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));  // Dispatch removeItem to delete the item from the cart
  };

  // Calculate total cost of a single item based on its quantity and price
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.substring(1))).toFixed(2);  // Calculate and return subtotal for the item
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
