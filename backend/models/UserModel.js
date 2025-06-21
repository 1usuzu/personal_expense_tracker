const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên là bắt buộc'],
        },
        email: {
            type: String,
            required: [true, 'Email là bắt buộc'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu là bắt buộc'],
        },
    },
    {
        timestamps: true, // Tự động thêm trường createdAt và updatedAt
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
