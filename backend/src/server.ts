import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './interfaces/http/routes/leadRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/leads', leadRoutes);

app.get('/', (req, res) => {
  res.send('Lead Manager API is running...');
});

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/lead-manager';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
