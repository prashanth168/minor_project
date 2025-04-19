const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'your_default_secret_key';

module.exports = function ({
  patientCollection,
  doctorCollection,
  adminCollection,
  predictionHistoryCollection
}) {
  const userRouter = express.Router();

  // === ROLE-BASED REGISTRATION ===
  userRouter.post('/register', async (req, res) => {
    const userData = req.body;
    const { username, password, role } = userData;

    try {
      let collection;

      if (role === 'patient') collection = patientCollection;
      else if (role === 'doctor') collection = doctorCollection;
      else if (role === 'admin') collection = adminCollection;
      else return res.status(400).json({ message: 'Invalid role provided' });

      const existingUser = await collection.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this username.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
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

      if (role === 'patient') collection = patientCollection;
      else if (role === 'doctor') collection = doctorCollection;
      else if (role === 'admin') collection = adminCollection;
      else return res.status(400).json({ message: 'Invalid role provided' });

      const user = await collection.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username, role },
        secretKey,
        { expiresIn: '1h' }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        message: 'Login successful',
        token,
        ...userWithoutPassword
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  });

  // === FETCH DOCTORS ROUTE ===
  userRouter.get('/doctors', async (req, res) => {
    try {
      const doctors = await doctorCollection.find().toArray();
      if (doctors.length === 0) {
        return res.status(404).json({ message: 'No doctors found' });
      }

      res.status(200).json({ message: 'Doctors fetched successfully', data: doctors });
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
  });

  // === SAVE PREDICTION HISTORY ===
  userRouter.post('/save-prediction', async (req, res) => {
    const { userId, symptoms, disease, description, precautions, specialist } = req.body;

    if (!userId || !symptoms || !disease) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      await predictionHistoryCollection.insertOne({
        userId,
        symptoms,
        disease,
        description,
        precautions,
        specialist,
        timestamp: new Date()
      });

      res.status(200).json({ message: 'Prediction saved successfully' });
    } catch (err) {
      console.error('Error saving prediction:', err);
      res.status(500).json({ message: 'Error saving prediction', error: err.message });
    }
  });

  // === GET USER PREDICTION HISTORY ===
  userRouter.get('/get-history/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const history = await predictionHistoryCollection
        .find({ userId })
        .sort({ timestamp: -1 })
        .toArray();

      res.status(200).json({ message: 'History fetched', data: history });
    } catch (err) {
      console.error('Error fetching history:', err);
      res.status(500).json({ message: 'Error fetching history', error: err.message });
    }
  });

  return userRouter;
};
