const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

router.post('/login', (req, res) => {
  const { employeeid, email_id, Role } = req.body;

  // Validation for required fields
  if (!employeeid || !email_id || !Role) {
    return res.status(400).json({ message: 'Missing login fields' });
  }

  // Create JWT token
  const token = jwt.sign(
    { employeeid, email_id, Role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );


  res.status(200).json({
    message: 'Login successful',
    token
  });
});

module.exports = router;
