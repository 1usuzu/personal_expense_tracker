// models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên là bắt buộc'], // Thêm thông báo lỗi
        },
        email: {
            type: String,
            required: [true, 'Email là bắt buộc'],
            unique: true, // Đảm bảo mỗi email là duy nhất
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu là bắt buộc'],
        },
    },
    {
        timestamps: true, // Tự động thêm 2 trường: createdAt và updatedAt
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;