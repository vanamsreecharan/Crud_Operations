
const User = require('../Models/User');

// Create User
exports.createUser = async (req, res) => {
  try {
    let { employeeid, firstname, lastname, email_id, Role, Address, DOB, PhoneNumber } = req.body;

    // Auto-generate employeeid if not provided
    if (!employeeid) {
      const lastUser = await User.findOne().sort({ employeeid: -1 });

      let newIdNumber = 1000;
      if (lastUser && lastUser.employeeid) {
        const lastId = parseInt(lastUser.employeeid.replace('SIG', ''), 10);
        newIdNumber = lastId + 1;
      }

      employeeid = `SIG${newIdNumber}`;
    }

    const newUser = await User.create({
      employeeid,
      firstname,
      lastname,
      email_id,
      Role,
      Address,
      DOB,
      PhoneNumber
    });

    res.status(201).json({
      message: 'User created successfully!',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create user',
      error: error.message
    });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ employeeid: req.params.id });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch user',
      error: error.message
    });
  }
};

// Delete User by ID
exports.deleteUserById = async (req, res) => {
  console.log(`DELETE request received for ID: ${req.params.id}`);
  try {
    const result = await User.deleteOne({ employeeid: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete user',
      error: error.message,
    });
  }
};

// Update User by ID
exports.updateUserById = async (req, res) => {
  try {
    const result = await User.updateOne({ employeeid: req.params.id }, req.body);

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        message: 'User not found or nothing to update',
      });
    }

    const updatedUser = await User.findOne({ employeeid: req.params.id });

    res.status(200).json({
      message: 'User data updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update user',
      error: error.message,
    });
  }
};

// Get Company Summary
exports.getCompanySummary = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments();

    const roleSummary = await User.aggregate([
      {
        $group: {
          _id: "$Role",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      message: 'Company data fetched successfully',
      totalEmployees,
      roleSummary
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch company summary',
      error: error.message,
    });
  }
};


