const Transaction = require('../models/TransactionModel');

// @desc    Lấy tất cả giao dịch của người dùng
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        // Tìm tất cả giao dịch thuộc về user đã đăng nhập (lấy từ middleware)
        const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Thêm một giao dịch mới
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
    try {
        const { amount, type, category, date, note } = req.body;

        if (!amount || !type || !category || !date) {
            return res.status(400).json({ message: 'Vui lòng điền các trường bắt buộc' });
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            amount,
            type,
            category,
            date,
            note,
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cập nhật một giao dịch
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Không tìm thấy giao dịch' });
        }

        // Kiểm tra xem giao dịch có thuộc về người dùng đang đăng nhập không
        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Không có quyền truy cập' });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Xóa một giao dịch
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Không tìm thấy giao dịch' });
        }

        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Không có quyền truy cập' });
        }

        await transaction.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Giao dịch đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
};
