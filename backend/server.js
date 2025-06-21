// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Cấu hình để sử dụng file .env
dotenv.config();

connectDB(); // Kết nối đến MongoDB

const app = express();

app.use(cors());

app.use(express.json());

// Định nghĩa các Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Bảo vệ các route giao dịch bằng middleware 'protect'
app.use('/api/transactions', require('./routes/transactionRoutes'));

// Định nghĩa cổng cho server, ưu tiên lấy từ file .env hoặc mặc định là 5001
const PORT = process.env.PORT || 5001;

// Route thử nghiệm
app.get('/api/test', (req, res) => {
    res.json({ message: 'API đang hoạt động tốt!' });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});