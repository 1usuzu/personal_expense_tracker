const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// Áp dụng middleware 'protect' cho các route này
// Bất kỳ request nào đến '/' sẽ phải đi qua 'protect' trước
// Các route cho collection chung (GET all, POST new)
router.route('/')
    .get(protect, getTransactions)
    .post(protect, addTransaction);

// 2. Thêm các route cho một document cụ thể (GET by ID, PUT, DELETE)
router.route('/:id')
    .put(protect, updateTransaction)
    .delete(protect, deleteTransaction);

module.exports = router;