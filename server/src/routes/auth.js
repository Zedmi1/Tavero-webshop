const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth');
const { send2FACode, sendPasswordResetEmail } = require('../utils/email');

const router = express.Router();
const prisma = new PrismaClient();

function generate6DigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

function validatePassword(password) {
  const errors = [];
  if (password.length < 12) errors.push('at least 12 characters');
  if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('one number');
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'`~]/.test(password)) errors.push('one special character');
  if ((password.match(/[0-9]/g) || []).length < 2) errors.push('at least 2 numbers');
  if ((password.match(/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'`~]/g) || []).length < 2) errors.push('at least 2 special characters');
  if (/(.)\1{2,}/.test(password)) errors.push('no more than 2 repeated characters in a row');
  if (/^(password|123456|qwerty|admin|letmein|welcome)/i.test(password)) errors.push('no common passwords');
  return errors;
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Email, password, first name, and last name are required' });
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ error: 'Password must contain: ' + passwordErrors.join(', ') });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone: phone || null,
        twoFactorEnabled: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true
      }
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.twoFactorEnabled) {
      const code = generate6DigitCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.twoFactorCode.deleteMany({
        where: { userId: user.id, used: false }
      });

      await prisma.twoFactorCode.create({
        data: {
          userId: user.id,
          code,
          expiresAt
        }
      });

      const emailResult = await send2FACode(user.email, code);
      
      if (!emailResult.success) {
        console.error('Failed to send 2FA email:', emailResult.error);
      }

      return res.json({
        requires2FA: true,
        userId: user.id,
        message: 'Verification code sent to your email'
      });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

router.post('/verify-2fa', async (req, res) => {
  try {
    const { userId, code } = req.body;

    if (!userId || !code) {
      return res.status(400).json({ error: 'User ID and code are required' });
    }

    const twoFactorCode = await prisma.twoFactorCode.findFirst({
      where: {
        userId: parseInt(userId),
        code,
        used: false,
        expiresAt: { gt: new Date() }
      }
    });

    if (!twoFactorCode) {
      return res.status(401).json({ error: 'Invalid or expired verification code' });
    }

    await prisma.twoFactorCode.update({
      where: { id: twoFactorCode.id },
      data: { used: true }
    });

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true
      }
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user, token });
  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({ error: 'Failed to verify code' });
  }
});

router.post('/resend-2fa', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.twoFactorCode.deleteMany({
      where: { userId: user.id, used: false }
    });

    const code = generate6DigitCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.twoFactorCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt
      }
    });

    const emailResult = await send2FACode(user.email, code);

    if (!emailResult.success) {
      return res.status(500).json({ error: 'Failed to send verification code' });
    }

    res.json({ message: 'New verification code sent' });
  } catch (error) {
    console.error('Resend 2FA error:', error);
    res.status(500).json({ error: 'Failed to resend code' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ error: 'No account found with this email address' });
    }

    await prisma.passwordReset.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true }
    });

    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt
      }
    });

    const baseUrl = (process.env.FRONTEND_URL || req.headers.origin || 'http://localhost:5000').replace(/\/+$/, '');
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    const emailResult = await sendPasswordResetEmail(user.email, token, resetUrl);

    if (!emailResult.success) {
      console.error('Failed to send password reset email:', emailResult.error);
    }

    res.json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ error: 'Password must contain: ' + passwordErrors.join(', ') });
    }

    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token,
        used: false,
        expiresAt: { gt: new Date() }
      }
    });

    if (!passwordReset) {
      return res.status(400).json({ error: 'Invalid or expired reset link' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: passwordReset.userId },
      data: { password: hashedPassword }
    });

    await prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { used: true }
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

router.get('/verify-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const passwordReset = await prisma.passwordReset.findFirst({
      where: {
        token,
        used: false,
        expiresAt: { gt: new Date() }
      }
    });

    if (!passwordReset) {
      return res.status(400).json({ valid: false, error: 'Invalid or expired reset link' });
    }

    res.json({ valid: true });
  } catch (error) {
    console.error('Verify reset token error:', error);
    res.status(500).json({ valid: false, error: 'Failed to verify token' });
  }
});

router.put('/toggle-2fa', authenticateToken, async (req, res) => {
  try {
    const { enabled } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { twoFactorEnabled: enabled },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        twoFactorEnabled: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Toggle 2FA error:', error);
    res.status(500).json({ error: 'Failed to update 2FA setting' });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        twoFactorEnabled: true,
        createdAt: true,
        addresses: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { firstName, lastName, phone },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: { 
          email,
          NOT: { id: req.user.userId }
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use by another account' });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: { 
        firstName, 
        lastName, 
        email,
        phone: phone || null 
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ error: 'Password must contain: ' + passwordErrors.join(', ') });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

router.post('/addresses', authenticateToken, async (req, res) => {
  try {
    const { street, city, postcode, country, isDefault } = req.body;

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user.userId },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: req.user.userId,
        street,
        city,
        postcode,
        country: country || 'Netherlands',
        isDefault: isDefault || false
      }
    });

    res.status(201).json(address);
  } catch (error) {
    console.error('Create address error:', error);
    res.status(500).json({ error: 'Failed to create address' });
  }
});

router.put('/addresses/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { street, city, postcode, country, isDefault } = req.body;

    const address = await prisma.address.findFirst({
      where: { id: parseInt(id), userId: req.user.userId }
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: req.user.userId },
        data: { isDefault: false }
      });
    }

    const updatedAddress = await prisma.address.update({
      where: { id: parseInt(id) },
      data: {
        street,
        city,
        postcode,
        country: country || 'Netherlands',
        isDefault: isDefault || false
      }
    });

    res.json(updatedAddress);
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
});

router.delete('/addresses/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const address = await prisma.address.findFirst({
      where: { id: parseInt(id), userId: req.user.userId }
    });

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await prisma.address.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

module.exports = router;
