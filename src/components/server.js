// // server.js
// import express, { json } from 'express';
// import { connect, Schema, model } from 'mongoose';
// import { hash, compare } from 'bcryptjs';
// import { sign, verify } from 'jsonwebtoken';
// import cors from 'cors';

// const app = express();
// app.use(json());
// app.use(cors());  // Allows your frontend to communicate with the backend

// // Connect to MongoDB
// connect('mongodb://localhost:27017/CarManagement', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // User schema and model
// const userSchema = new Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = model('User', userSchema);

// // Register (for testing purposes)
// app.post('/register', async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await hash(password, 10);
//   const newUser = new User({ email, password: hashedPassword });
//   await newUser.save();
//   res.status(201).send('User registered successfully');
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Find user by email
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: 'User not found' });

//   // Compare the password with the stored hashed password
//   const isPasswordValid = await compare(password, user.password);
//   if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

//   // Generate JWT token
//   const token = sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
//   res.json({ token });
// });

// // Protected route example (after login)
// app.get('/vehicle-manager', (req, res) => {
//   const token = req.headers['authorization'].split(' ')[1];
//   if (!token) return res.status(401).send('Access denied');

//   verify(token, 'your_secret_key', (err, decoded) => {
//     if (err) return res.status(401).send('Invalid token');
//     res.send('Welcome to the vehicle manager page');
//   });
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
