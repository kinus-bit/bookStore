import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

const BookForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !price) return;

    onSubmit({ title, author, price: parseFloat(price) });

    // Reset form
    setTitle('');
    setAuthor('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label>Author</Label>
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <Label>Price ($)</Label>
        <Input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Button type="submit">Save Book</Button>
    </form>
  );
};

export default BookForm;
