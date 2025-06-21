const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Thực hiện kết nối đến MongoDB bằng chuỗi kết nối trong file .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Nếu kết nối thành công, in ra log
        console.log(`MongoDB đã được kết nối: ${conn.connection.host}`);
    } catch (error) {
        // Nếu có lỗi, in ra lỗi và thoát khỏi tiến trình với mã lỗi 1
        console.error(`Lỗi: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;