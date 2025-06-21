import API from './api';

// Lấy tất cả giao dịch
const getTransactions = () => API.get('/transactions');

// Thêm giao dịch mới
const addTransaction = (transactionData) => API.post('/transactions', transactionData);

// Xóa giao dịch
const deleteTransaction = (transactionId) => API.delete(`/transactions/${transactionId}`);

// Sửa giao dịch
const updateTransaction = (transactionId, updatedData) => API.put(`/transactions/${transactionId}`, updatedData);

const transactionService = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};

export default transactionService;
