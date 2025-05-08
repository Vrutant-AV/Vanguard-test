const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models');

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Check if admin exists
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    if (existingAdmin) {
      console.log('Admin already exists. Skipping seeding.');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin created successfully:', admin.email);
  } catch (err) {
    console.error('Error seeding admin:', err);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

seedAdmin();
