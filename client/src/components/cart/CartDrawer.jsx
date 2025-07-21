import React from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartDrawer = ({ cartItems, onRemove }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 w-full max-w-md bg-white border shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, i) => (
            <CartItem
              key={i}
              title={item.title}
              author={item.author}
              price={item.price}
              onRemove={() => onRemove(i)}
            />
          ))}
          <CartSummary total={total} />
        </>
      )}
    </div>
  );
};

export default CartDrawer;
