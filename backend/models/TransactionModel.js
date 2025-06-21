// models/TransactionModel.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu đặc biệt để lưu ID
            ref: 'User', // Tham chiếu đến model 'User'
            required: true,
        },
        amount: {
            type: Number,
            required: [true, 'Số tiền là bắt buộc'],
        },
        type: {
            type: String,
            required: [true, 'Loại giao dịch là bắt buộc'], // 'income' hoặc 'expense'
        },
        category: {
            type: String,
            required: [true, 'Danh mục là bắt buộc'],
        },
        date: {
            type: Date,
            required: [true, 'Ngày giao dịch là bắt buộc'],
        },
        note: {
            type: String,
            required: false, // Ghi chú không bắt buộc
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;