import React, { useState, useEffect } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import BookCard from '../components/BookCard';
import Navigation from '../components/Navigation';
import API from '../services/api'; // ✅ your direct import

const BuyerDashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await API.get('/books/all'); // ✅ call to /api/books
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const categories = ['all', ...new Set(books.map(book => book.category))];

  const filteredAndSortedBooks = books
    .filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      return matchesSearch && matchesCategory && book.stock > 0;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const handleAddToCart = (book) => {
    addToCart(book);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discover Great Books</h1>
        <p className="text-gray-600">Browse our collection of carefully curated books</p>
      </div>

      <Navigation />

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Books</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="title">Title A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {filteredAndSortedBooks.length} books found
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }
      >
        {filteredAndSortedBooks.map(book => (
          <BookCard key={book._id || book.id} book={book} viewMode={viewMode} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedBooks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;

// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Star, ShoppingCart, Grid, List } from 'lucide-react';
// import { useCart } from '../contexts/CartContext';
// import BookCard from '../components/BookCard';
// import Navigation from '../components/Navigation';
// import API from '../services/api';

// const BuyerDashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('title');
//   const [viewMode, setViewMode] = useState('grid');
//   const { addToCart } = useCart();

//   // Mock data - In a real app, this would come from an API
//    const loadBooks = async () => {
//       try {
//         const data = await API();
//         setBooks(data); // assuming API returns an array of books
//       } catch (err) {
//         console.error('Failed to load books:', err);
//       }
//     };

//   useEffect(() => {
//     ;
//     setBooks(mockBooks);
//   }, []);

//   const categories = ['all', ...new Set(books.map(book => book.category))];

//   const filteredAndSortedBooks = books
//     .filter(book => {
//       const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
//       return matchesSearch && matchesCategory && book.stock > 0;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'price-low':
//           return a.price - b.price;
//         case 'price-high':
//           return b.price - a.price;
//         case 'rating':
//           return b.rating - a.rating;
//         case 'title':
//         default:
//           return a.title.localeCompare(b.title);
//       }
//     });

//   const handleAddToCart = (book) => {
//     addToCart(book);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Discover Great Books</h1>
//         <p className="text-gray-600">Browse our collection of carefully curated books</p>
//       </div>

//       <Navigation/>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//           {/* Search */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Search Books
//             </label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by title or author..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           {/* Category Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Category
//             </label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category === 'all' ? 'All Categories' : category}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sort */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Sort By
//             </label>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="title">Title A-Z</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//             </select>
//           </div>
//         </div>

//         {/* View Mode Toggle */}
//         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
//           <p className="text-sm text-gray-600">
//             {filteredAndSortedBooks.length} books found
//           </p>
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-600">View:</span>
//             <div className="flex bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-2 rounded transition-colors ${
//                   viewMode === 'grid'
//                     ? 'bg-white text-blue-600 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <Grid className="h-4 w-4" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-2 rounded transition-colors ${
//                   viewMode === 'list'
//                     ? 'bg-white text-blue-600 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                 }`}
//               >
//                 <List className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Books Grid/List */}
//       <div className={
//         viewMode === 'grid'
//           ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
//           : 'space-y-4'
//       }>
//         {filteredAndSortedBooks.map(book => (
//           <BookCard
//             key={book.id}
//             book={book}
//             viewMode={viewMode}
//             onAddToCart={handleAddToCart}
//           />
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredAndSortedBooks.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <Search className="h-12 w-12 mx-auto" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
//           <p className="text-gray-600">
//             Try adjusting your search criteria or browse all categories.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyerDashboard;