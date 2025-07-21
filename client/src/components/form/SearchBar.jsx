import React from 'react';
import { Input } from '../ui/Input';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mb-4"
    />
  );
};

export default SearchBar;
