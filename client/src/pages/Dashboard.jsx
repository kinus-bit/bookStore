import React, { useState } from 'react';
import Container from '../components/book/Container';
import CartDrawer from '../components/cart/CartDrawer';
import EmptyState from '../components/feedback/EmptyState';
import { showSuccess } from '../components/feedback/Toast';

export default function DeveloperDashboard() {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Refactoring', author: 'Martin Fowler', price: 34.99 },
    { id: 2, title: 'You Don’t Know JS', author: 'Kyle Simpson', price: 22.49 },
  ]);

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    showSuccess('Removed from cart');
  };

  return (
    <Container>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Developer Dashboard</h1>

        {cartItems.length > 0 ? (
          <CartDrawer cartItems={cartItems} onRemove={handleRemove} />
        ) : (
          <EmptyState message="No items in your developer cart." />
        )}
      </div>
    </Container>
  );
}
