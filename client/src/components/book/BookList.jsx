import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book, index) => (
        <BookCard
          key={index}
          title={book.title}
          author={book.author}
          price={book.price}
          onAddToCart={book.onAddToCart}
        />
      ))}
    </div>
  );
};

export default BookList;
