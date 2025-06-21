// src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import các Service và Component cần thiết
import authService from '../services/authService';
import transactionService from '../services/transactionService';
import TransactionForm from '../components/TransactionForm';
import Modal from '../components/Modal';

// Import CSS
import '../css/DashboardPage.css';

function DashboardPage() {
    // Hooks
    const navigate = useNavigate();

    // State quản lý danh sách giao dịch
    const [transactions, setTransactions] = useState([]);

    // State quản lý trạng thái của Modal (đóng/mở)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State lưu trữ giao dịch đang được chọn để sửa
    const [currentTransaction, setCurrentTransaction] = useState(null);

    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // useEffect để lấy dữ liệu giao dịch khi component được tải lần đầu
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await transactionService.getTransactions();
                setTransactions(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu giao dịch", error);
                if (error.response && error.response.status === 401) {
                    // Di chuyển logic logout vào đây
                    authService.logout();
                    navigate('/login');
                }
            }
        };

        fetchTransactions();
    }, [navigate]);
    // ===== CÁC HÀM XỬ LÝ SỰ KIỆN =====

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    // Xử lý khi thêm một giao dịch mới
    const handleAddTransaction = async (transactionData) => {
        try {
            const response = await transactionService.addTransaction(transactionData);
            // Cập nhật UI bằng cách thêm giao dịch mới vào đầu danh sách
            setTransactions([response.data, ...transactions]);
        } catch (error) {
            console.error("Lỗi khi thêm giao dịch", error);
            alert("Thêm giao dịch thất bại!");
        }
    };

    // Xử lý khi xóa một giao dịch
    const handleDeleteTransaction = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giao dịch này không?')) {
            try {
                await transactionService.deleteTransaction(id);
                // Cập nhật UI bằng cách lọc bỏ giao dịch đã bị xóa
                setTransactions(transactions.filter((t) => t._id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa giao dịch", error);
                alert("Xóa giao dịch thất bại!");
            }
        }
    };

    // Xử lý khi cập nhật một giao dịch
    const handleUpdateTransaction = async (id, transactionData) => {
        try {
            const response = await transactionService.updateTransaction(id, transactionData);
            // Cập nhật UI bằng cách thay thế giao dịch cũ bằng giao dịch mới
            setTransactions(
                transactions.map((t) => (t._id === id ? response.data : t))
            );
            closeEditModal(); // Đóng modal sau khi cập nhật thành công
        } catch (error) {
            console.error("Lỗi khi cập nhật giao dịch", error);
            alert("Cập nhật thất bại!");
        }
    };

    // Mở modal và gán giao dịch cần sửa
    const openEditModal = (transaction) => {
        setCurrentTransaction(transaction);
        setIsModalOpen(true);
    };

    // Đóng modal và reset giao dịch đang sửa
    const closeEditModal = () => {
        setIsModalOpen(false);
        setCurrentTransaction(null);
    };


    // ===== PHẦN RENDER GIAO DIỆN =====

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                {user && <h2>Chào mừng, {user.name}!</h2>}
                <button onClick={handleLogout} className="logout-btn">
                    Đăng xuất
                </button>
            </header>

            <hr />

            {/* Form để THÊM giao dịch mới */}
            <TransactionForm onAddTransaction={handleAddTransaction} />

            <section className="transactions-section">
                <h3>Lịch sử giao dịch</h3>
                <ul className="transactions-list">
                    {transactions.length > 0 ? (
                        transactions.map((t) => (
                            <li key={t._id} className={`transaction-item ${t.type}`}>
                                <div className="transaction-details">
                                    <div className="category">{t.category}</div>
                                    <div className="date">{new Date(t.date).toLocaleDateString('vi-VN')}</div>
                                    {t.note && <small style={{ color: '#555' }}><i>Ghi chú: {t.note}</i></small>}
                                </div>
                                <div className="transaction-right-section">
                                    <div className={`transaction-amount ${t.type}`}>
                                        {t.type === 'expense' ? '-' : '+'}
                                        {t.amount.toLocaleString('vi-VN')} VND
                                    </div>
                                    <button onClick={() => openEditModal(t)} className="action-btn edit-btn">
                                        Sửa
                                    </button>
                                    <button onClick={() => handleDeleteTransaction(t._id)} className="action-btn delete-btn">
                                        Xóa
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Chưa có giao dịch nào.</p>
                    )}
                </ul>
            </section>

            {/* Modal để SỬA giao dịch, chỉ hiện khi isModalOpen là true */}
            <Modal isOpen={isModalOpen} onClose={closeEditModal}>
                {currentTransaction && (
                    <TransactionForm
                        onAddTransaction={(data) => handleUpdateTransaction(currentTransaction._id, data)}
                        existingTransaction={currentTransaction}
                    />
                )}
            </Modal>
        </div>
    );
}

export default DashboardPage;
