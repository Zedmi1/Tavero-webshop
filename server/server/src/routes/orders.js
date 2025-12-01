const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

const FREE_SHIPPING_THRESHOLD = 50.00;

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TAV-${timestamp}-${random}`;
}

router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: {
        items: true,
        shippingMethod: true,
        address: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/:orderNumber', authenticateToken, async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        shippingMethod: true,
        address: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { addressId, shippingMethodId, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    const shippingMethod = await prisma.shippingMethod.findUnique({
      where: { id: parseInt(shippingMethodId) }
    });

    if (!shippingMethod) {
      return res.status(400).json({ error: 'Invalid shipping method' });
    }

    const subtotal = items.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);

    let shippingCost = parseFloat(shippingMethod.price);
    if (shippingMethod.name === 'Standard Shipping' && subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingCost = 0;
    }

    const total = subtotal + shippingCost;

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: req.user.userId,
        addressId: parseInt(addressId),
        shippingMethodId: parseInt(shippingMethodId),
        subtotal,
        shippingCost,
        total,
        items: {
          create: items.map(item => ({
            productName: item.productName,
            size: item.size,
            quantity: item.quantity,
            price: parseFloat(item.price)
          }))
        }
      },
      include: {
        items: true,
        shippingMethod: true,
        address: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
