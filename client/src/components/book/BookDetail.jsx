import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const BookDetail = ({ book }) => {
  return (
    <Card className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-muted-foreground text-sm">Author: {book.author}</p>
      <p className="text-xl font-semibold">${book.price}</p>
      <Button>Add to Cart</Button>
    </Card>
  );
};

export default BookDetail;
