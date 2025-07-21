import React from 'react';
import { Button } from '../ui/Button';

const CartSummary = ({ total }) => {
  return (
    <div className="border-t pt-4 mt-4 text-right">
      <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
      <Button className="mt-2">Checkout</Button>
    </div>
  );
};

export default CartSummary;
