const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// Bất kỳ request nào đến '/' sẽ phải đi qua 'protect' trước
router.route('/')
    .get(protect, getTransactions)
    .post(protect, addTransaction);

// 2. Thêm các route cho một document cụ thể
router.route('/:id')
    .put(protect, updateTransaction)
    .delete(protect, deleteTransaction);

module.exports = router;
