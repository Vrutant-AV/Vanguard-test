const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();
        
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error upating password:', error);
        res.status(500).json({ message: 'Password change failed', error: error.message});
    }
};