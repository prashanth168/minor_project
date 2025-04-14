const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'your_default_secret_key';

module.exports = function ({ patientCollection, doctorCollection, adminCollection }) {
  const userRouter = express.Router();

  // === ROLE-BASED REGISTRATION ===
  userRouter.post('/register', async (req, res) => {
    const userData = req.body;
    const { username, password, role } = userData;

    try {
      let collection;

      // Assign collection based on role
      if (role === 'patient') collection = patientCollection;
      else if (role === 'doctor') collection = doctorCollection;
      else if (role === 'admin') collection = adminCollection;
      else return res.status(400).json({ message: 'Invalid role provided' });

      // Check for existing user by username
      const existingUser = await collection.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this username.' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user
      const result = await collection.insertOne({
        ...userData,
        password: hashedPassword
      });

      res.status(201).json({ message: 'User registered successfully', data: result });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Registration failed', error: err.message });
    }
  });

  // === ROLE-BASED LOGIN ===
  userRouter.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    try {
      let collection;

      // Assign collection based on role
      if (role === 'patient') collection = patientCollection;
      else if (role === 'doctor') collection = doctorCollection;
      else if (role === 'admin') collection = adminCollection;
      else return res.status(400).json({ message: 'Invalid role provided' });

      // Find user by username and role
      const user = await collection.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Validate password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user._id, username: user.username, role },
        secretKey,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        username: user.username,
        role
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  });

  return userRouter;
};
