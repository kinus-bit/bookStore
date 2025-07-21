import React, { useState } from 'react';
import { Button } from '../ui/Button';
import PriceTag from '../shared/PriceTag';
import QuantitySelector from '../shared/QuantitySelector';

const CartItem = ({ title, author, price, onRemove }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">by {author}</p>
        <div className="flex items-center gap-2 mt-1">
          <PriceTag price={price * quantity} />
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>
      </div>
      <Button onClick={onRemove} variant="destructive" size="sm">
        Remove
      </Button>
    </div>
  );
};

export default CartItem;
