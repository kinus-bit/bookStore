import React from 'react';
import { Button } from './ui/Button';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <h1 className="text-xl font-bold">Bookstore</h1>
      <div className="space-x-2">
        <Button>Books</Button>
        <Button>Cart</Button>
      </div>
    </nav>
  );
};

export default Navbar;
