import React, { useState } from 'react';
import SearchBar from '../form/SearchBar'; // ✅ Use new component

const BookFilter = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onFilter(value);
  };

  return <SearchBar value={query} onChange={handleChange} placeholder="Search books..." />;
};

export default BookFilter;
