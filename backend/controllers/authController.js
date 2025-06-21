const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Đăng ký người dùng mới
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        // 1. Lấy thông tin từ request body
        const { name, email, password } = req.body;

        // 2. Kiểm tra các trường bắt buộc
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
            return;
        }

        // 3. Kiểm tra xem email đã tồn tại chưa
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'Email đã được sử dụng' });
            return;
        }

        // 4. Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Tạo người dùng mới và lưu vào DB
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // 6. Nếu tạo thành công, tạo JWT và trả về cho client
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d', // Token hết hạn sau 30 ngày
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
            });
        } else {
            res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Đăng nhập người dùng
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        // 1. Lấy email và password từ request body
        const { email, password } = req.body;

        // 2. Tìm người dùng trong database bằng email
        const user = await User.findOne({ email });

        // 3. Nếu tìm thấy người dùng VÀ mật khẩu khớp
        if (user && (await bcrypt.compare(password, user.password))) {
            // Tạo JWT mới
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            // Trả về thông tin người dùng và token
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
            });
        } else {
            // Nếu người dùng không tồn tại hoặc mật khẩu sai
            res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Đăng xuất người dùng không cần thiết phải có route riêng vì JWT sẽ hết hạn sau một thời gian.
// Tuy nhiên, nếu cần, có thể xóa token ở phía client để "đăng xuất" người dùng.
module.exports = { registerUser, loginUser };