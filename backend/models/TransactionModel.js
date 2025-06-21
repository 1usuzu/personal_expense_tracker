const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amount: {
            type: Number,
            required: [true, 'Số tiền là bắt buộc'],
        },
        type: {
            type: String,
            required: [true, 'Loại giao dịch là bắt buộc'],
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
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
