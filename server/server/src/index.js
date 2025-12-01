require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const shippingRoutes = require('./routes/shipping');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipping', shippingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tavero API is running' });
});

const clientPath = path.join(__dirname, '../../dist');
app.use(express.static(clientPath));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientPath, 'index.html'));
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Tavero server running on port ${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
