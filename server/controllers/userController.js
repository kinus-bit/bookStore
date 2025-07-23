const User = require('../models/User');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// Get a single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Create user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role, status, joinDate, lastLogin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ username, email, password, role, status, joinDate, lastLogin });
    await user.save();
    const savedUser = user.toObject();
    delete savedUser.password;

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { username, email, role, status, lastLogin } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role, status, lastLogin },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
