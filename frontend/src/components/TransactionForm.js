import React, { useState, useEffect } from 'react';

import '../css/components/TransactionForm.css';

function TransactionForm({ onAddTransaction, existingTransaction }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');

  const isEditMode = !!existingTransaction;

  useEffect(() => {
    if (isEditMode) {
      setAmount(existingTransaction.amount);
      setType(existingTransaction.type);
      setCategory(existingTransaction.category);
      setDate(new Date(existingTransaction.date).toISOString().slice(0, 10));
      setNote(existingTransaction.note || '');
    }
  }, [existingTransaction, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category) {
      alert('Vui lòng nhập số tiền và danh mục');
      return;
    }
    const transactionData = {
      amount: +amount,
      type,
      category,
      date,
      note,
    };

    await onAddTransaction(transactionData);

    if (!isEditMode) {
      setAmount('');
      setCategory('');
      setNote('');
      setDate(new Date().toISOString().slice(0, 10));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h3>{isEditMode ? 'Sửa Giao dịch' : 'Thêm giao dịch mới'}</h3>

      <div className="form-row">
        <input
          type="number"
          placeholder="Số tiền"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Chi tiêu</option>
          <option value="income">Thu nhập</option>
        </select>
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Danh mục (VD: Ăn uống, Lương...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <textarea
        placeholder="Ghi chú..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>

      <button type="submit">{isEditMode ? 'Lưu thay đổi' : 'Thêm Giao dịch'}</button>
    </form>
  );
}

export default TransactionForm;
