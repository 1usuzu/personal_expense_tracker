const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Lấy token từ header (loại bỏ chữ 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 2. Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Lấy thông tin người dùng từ token (bỏ qua mật khẩu) và gán vào request
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Cho phép request đi tiếp
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Xác thực thất bại, token không hợp lệ' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Xác thực thất bại, không tìm thấy token' });
    }
};

module.exports = { protect };
