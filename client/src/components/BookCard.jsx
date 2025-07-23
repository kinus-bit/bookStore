import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';

const BookCard = ({ book, viewMode = 'grid', onAddToCart }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-6">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(book.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({book.rating})</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {book.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{book.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-blue-600">${book.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-600">{book.stock} in stock</span>
                  </div>
                  
                  <button
                    onClick={() => onAddToCart(book)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="relative overflow-hidden">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {book.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(book.rating)}
          </div>
          <span className="text-sm text-gray-600">({book.rating})</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-blue-600">${book.price.toFixed(2)}</span>
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {book.stock} in stock
          </span>
        </div>
        
        <button
          onClick={() => onAddToCart(book)}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;