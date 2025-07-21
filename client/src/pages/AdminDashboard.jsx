import React, { useState } from 'react';
import BookForm from '../components/form/BookForm';
import BookList from '../components/book/BookList';
import { showSuccess } from '../components/feedback/Toast';
import Container from '../components/book/Container';
import EmptyState from '../components/feedback/EmptyState';

export default function AdminDashboard() {
 
     const [books, setBooks] = useState([
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', price: 29.99, cover: '/placeholder.jpg' },
    { id: 2, title: 'Atomic Habits', author: 'James Clear', price: 19.99, cover: '/placeholder.jpg' },
  ]);
  const [editingBook, setEditingBook] = useState(null);

  const handleAdd = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
    showSuccess('Book added!');
  };

  const handleUpdate = (book) => {
    setBooks((prev) => prev.map((b) => (b.id === book.id ? book : b)));
    setEditingBook(null);
    showSuccess('Book updated!');
  };

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    showSuccess('Book deleted!');
  };

  return (
    <Container>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <BookForm
          onSubmit={editingBook ? handleUpdate : handleAdd}
          initialData={editingBook}
          key={editingBook?.id || 'new'}
        />

        {books.length > 0 ? (
          <BookList
            books={books.map((b) => ({
              ...b,
              onEdit: () => setEditingBook(b),
              onDelete: () => handleDelete(b.id),
            }))}
            isAdmin
          />
        ) : (
          <EmptyState message="No books available. Add your first book!" />
        )}
      </div>
    </Container>
  );
   
  };


  
