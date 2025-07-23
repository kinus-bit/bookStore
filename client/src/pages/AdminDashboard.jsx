import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Search, Book, DollarSign, Users,
  ShoppingBag, Grid, List, UserPlus, Shield, Mail, Calendar
} from 'lucide-react';
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';
import UserForm from '../components/UserForm';
import API from '../services/api';
import Navigation from '../components/Navigation';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookRes, userRes] = await Promise.all([
        API.get('/books/all'),
        API.get('/users') // Assuming this endpoint exists
      ]);
  
      setBooks(bookRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.error('❌ Failed to load data:', error);
  
      // Optional: Show user-friendly error
      alert(error?.response?.data?.message || 'Something went wrong loading data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveBook = async (bookData) => {
    try {
      if (editingBook) {
        const res = await API.put(`/books/${editingBook._id}`, bookData);
        setBooks(prev => prev.map(book =>
          book._id === editingBook._id ? res.data : book
        ));
      } else {
        const res = await API.post('/books', bookData);
        setBooks(prev => [...prev, res.data]);
      }
      setShowBookForm(false);
      setEditingBook(null);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowBookForm(true);
  };
  
  

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await API.delete(`/books/${id}`);
        setBooks(prev => prev.filter(book => book._id !== id));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };
  
  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        const res = await API.put(`/users/${editingUser._id}`, userData);
        setUsers(prev => prev.map(user =>
          user._id === editingUser._id ? res.data : user
        ));
      } else {
        const res = await API.post('/users', {
          ...userData,
          joinDate: new Date().toISOString().split('T')[0],
          lastLogin: 'Never'
        });
        setUsers(prev => [...prev, res.data]);
      }
      setShowUserForm(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/users/${id}`);
        setUsers(prev => prev.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredBooks = books.filter(book =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const stats = {
    totalBooks: books.length,
    totalValue: books.reduce((sum, book) => sum + (book.price * book.stock), 0),
    lowStock: books.filter(book => book.stock < 10).length,
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    adminUsers: users.filter(user => user.role === 'admin').length
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: DollarSign },
    { id: 'books', label: 'Books', icon: Book },
    { id: 'inventory', label: 'Inventory', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users }
  ];

  
  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your bookstore inventory, users, and operations</p>
      </div>

      <Navigation/>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Books</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
                </div>
                <Book className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.adminUsers}</p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Books</h3>
              <div className="space-y-4">
                {books.slice(0, 5).map(book => (
                  <div key={book._id} className="flex items-center space-x-3">
                    <img src={book.imageUrl} alt={book.title} className="w-10 h-12 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
                      <p className="text-xs text-gray-600">by {book.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${book.price}</p>
                      <p className="text-xs text-gray-600">{book.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
              <div className="space-y-4">
                {users.slice(0, 5).map(user => (
                  <div key={user._id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {user.username.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Books Display Tab */}
      {activeTab === 'books' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
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

              <button
                onClick={() => {
                  setEditingBook(null);
                  setShowBookForm(true);
                }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </button>
            </div>
          </div>

          {/* Books Grid/List */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredBooks.map(book => (
              <div key={book._id} className="relative group">
                <BookCard
                  book={book}
                  viewMode={viewMode}
                  onAddToCart={() => {}} // Admin doesn't need cart functionality
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="p-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-50 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="p-2 bg-white text-red-600 rounded-lg shadow-md hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Management Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={() => {
                setEditingBook(null);
                setShowBookForm(true);
              }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Book</span>
            </button>
          </div>

          {/* Books Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-8 object-cover rounded"
                            src={book.imageUrl}
                            alt={book.title}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                            <div className="text-sm text-gray-500">by {book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${book.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          book.stock < 10 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {book.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditBook(book)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users Management Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={() => {
                setEditingUser(null);
                setShowUserForm(true);
              }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add New User</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {user.username.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {user.joinDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Book Form Modal */}
      {showBookForm && (
        <BookForm
          book={editingBook}
          onSave={handleSaveBook}
          onClose={() => {
            setShowBookForm(false);
            setEditingBook(null);
          }}
        />
      )}

      {/* User Form Modal */}
      {showUserForm && (
        <UserForm
          user={editingUser}
          onSave={handleSaveUser}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Search, Book, DollarSign, Users, ShoppingBag, Grid, List, UserPlus, Shield, Mail, Calendar } from 'lucide-react';
// import BookForm from '../components/BookForm';
// import BookCard from '../components/BookCard';
// import UserForm from '../components/UserForm';
// import API from '../services/api';

// const AdminDashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showBookForm, setShowBookForm] = useState(false);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [userSearchTerm, setUserSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('overview');
//   const [viewMode, setViewMode] = useState('grid');
//   const [loading, setLoading] = useState(true);

//   // Mock data - In a real app, this would come from an API
//   const load = async () => {
//     try {
//       const res = await API.get('/books');
//       setBooks(res.data);
//     //setting users later
//     } catch (error) {
//       res.status(404).json({message:'Failed to fetch the books'});
//     } finally{
//       setLoading(false);
//     }

//   }
//   useEffect(() => {
//     load();
//   }, []);

//   const handleSaveBook = (bookData) => {
//     if (editingBook) {
//       setBooks(prev => prev.map(book => 
//         book.id === editingBook.id ? { ...bookData, id: editingBook.id } : book
//       ));
//     } else {
//       const newBook = { ...bookData, id: Date.now(), rating: 0 };
//       setBooks(prev => [...prev, newBook]);
//     }
//     setShowBookForm(false);
//     setEditingBook(null);
//   };

//   const handleEditBook = (book) => {
//     setEditingBook(book);
//     setShowBookForm(true);
//   };

//   const handleDeleteBook = (bookId) => {
//     if (window.confirm('Are you sure you want to delete this book?')) {
//       setBooks(prev => prev.filter(book => book.id !== bookId));
//     }
//   };

//   const handleSaveUser = (userData) => {
//     if (editingUser) {
//       setUsers(prev => prev.map(user => 
//         user.id === editingUser.id ? { ...userData, id: editingUser.id } : user
//       ));
//     } else {
//       const newUser = { 
//         ...userData, 
//         id: Date.now(), 
//         joinDate: new Date().toISOString().split('T')[0],
//         lastLogin: 'Never'
//       };
//       setUsers(prev => [...prev, newUser]);
//     }
//     setShowUserForm(false);
//     setEditingUser(null);
//   };

//   const handleEditUser = (user) => {
//     setEditingUser(user);
//     setShowUserForm(true);
//   };

//   const handleDeleteUser = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(prev => prev.filter(user => user.id !== userId));
//     }
//   };

//   const filteredBooks = books.filter(book =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
//     user.role.toLowerCase().includes(userSearchTerm.toLowerCase())
//   );

//   const stats = {
//     totalBooks: books.length,
//     totalValue: books.reduce((sum, book) => sum + (book.price * book.stock), 0),
//     lowStock: books.filter(book => book.stock < 10).length,
//     totalUsers: users.length,
//     activeUsers: users.filter(user => user.status === 'active').length,
//     adminUsers: users.filter(user => user.role === 'admin').length
//   };

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: DollarSign },
//     { id: 'books', label: 'Books', icon: Book },
//     { id: 'inventory', label: 'Inventory', icon: ShoppingBag },
//     { id: 'users', label: 'Users', icon: Users }
//   ];



 // const mockBooks = [
    //   {
    //     id: 1,
    //     title: 'The Great Gatsby',
    //     author: 'F. Scott Fitzgerald',
    //     price: 12.99,
    //     category: 'Fiction',
    //     stock: 25,
    //     rating: 4.5,
    //     description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    //     imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
    //   },
    //   {
    //     id: 2,
    //     title: 'To Kill a Mockingbird',
    //     author: 'Harper Lee',
    //     price: 14.99,
    //     category: 'Fiction',
    //     stock: 18,
    //     rating: 4.8,
    //     description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    //     imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
    //   },
    //   {
    //     id: 3,
    //     title: '1984',
    //     author: 'George Orwell',
    //     price: 13.99,
    //     category: 'Fiction',
    //     stock: 30,
    //     rating: 4.7,
    //     description: 'A dystopian social science fiction novel about totalitarian control.',
    //     imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
    //   },
    //   {
    //     id: 4,
    //     title: 'The Catcher in the Rye',
    //     author: 'J.D. Salinger',
    //     price: 11.99,
    //     category: 'Fiction',
    //     stock: 22,
    //     rating: 4.2,
    //     description: 'A controversial novel about teenage rebellion and alienation.',
    //     imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
    //   },
    //   {
    //     id: 5,
    //     title: 'Sapiens',
    //     author: 'Yuval Noah Harari',
    //     price: 16.99,
    //     category: 'Non-Fiction',
    //     stock: 15,
    //     rating: 4.6,
    //     description: 'A brief history of humankind exploring how we came to dominate the world.',
    //     imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
    //   },
    //   {
    //     id: 6,
    //     title: 'The Psychology of Money',
    //     author: 'Morgan Housel',
    //     price: 15.99,
    //     category: 'Business',
    //     stock: 20,
    //     rating: 4.4,
    //     description: 'Timeless lessons on wealth, greed, and happiness.',
    //     imageUrl: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
    //   }
    // ];

    // const mockUsers = [
    //   {
    //     id: 1,
    //     name: 'Admin User',
    //     email: 'admin@bookstore.com',
    //     role: 'admin',
    //     status: 'active',
    //     joinDate: '2024-01-15',
    //     lastLogin: '2024-01-20'
    //   },
    //   {
    //     id: 2,
    //     name: 'John Doe',
    //     email: 'buyer@bookstore.com',
    //     role: 'buyer',
    //     status: 'active',
    //     joinDate: '2024-01-18',
    //     lastLogin: '2024-01-20'
    //   },
    //   {
    //     id: 3,
    //     name: 'Jane Smith',
    //     email: 'jane.smith@email.com',
    //     role: 'buyer',
    //     status: 'active',
    //     joinDate: '2024-01-10',
    //     lastLogin: '2024-01-19'
    //   },
    //   {
    //     id: 4,
    //     name: 'Mike Johnson',
    //     email: 'mike.johnson@email.com',
    //     role: 'buyer',
    //     status: 'inactive',
    //     joinDate: '2024-01-05',
    //     lastLogin: '2024-01-15'
    //   }
    // ];
