const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

const FREE_SHIPPING_THRESHOLD = 50.00;

router.get('/', async (req, res) => {
  try {
    const shippingMethods = await prisma.shippingMethod.findMany({
      orderBy: { price: 'asc' }
    });

    res.json(shippingMethods);
  } catch (error) {
    console.error('Error fetching shipping methods:', error);
    res.status(500).json({ error: 'Failed to fetch shipping methods' });
  }
});

router.get('/calculate', async (req, res) => {
  try {
    const { subtotal, methodId } = req.query;

    const shippingMethod = await prisma.shippingMethod.findUnique({
      where: { id: parseInt(methodId) }
    });

    if (!shippingMethod) {
      return res.status(404).json({ error: 'Shipping method not found' });
    }

    let cost = parseFloat(shippingMethod.price);
    const subtotalNum = parseFloat(subtotal);

    if (shippingMethod.name === 'Standard Shipping' && subtotalNum >= FREE_SHIPPING_THRESHOLD) {
      cost = 0;
    }

    res.json({
      method: shippingMethod,
      subtotal: subtotalNum,
      shippingCost: cost,
      total: subtotalNum + cost,
      isFree: cost === 0
    });
  } catch (error) {
    console.error('Error calculating shipping:', error);
    res.status(500).json({ error: 'Failed to calculate shipping' });
  }
});

module.exports = router;
