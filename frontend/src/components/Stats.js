import React from 'react';

import '../css/components/Stats.css';

function Stats({ transactions }) {
    // Dùng hàm .reduce() để tính toán tổng thu và chi
    const { totalIncome, totalExpense } = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.totalIncome += transaction.amount;
            } else {
                acc.totalExpense += transaction.amount;
            }
            return acc;
        },
        { totalIncome: 0, totalExpense: 0 }
    );

    const balance = totalIncome - totalExpense;

    // Hàm để format số tiền
    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    return (
        <div className="stats-container">
            <div className="stat-card income">
                <h4>Tổng Thu Nhập</h4>
                <p>{formatCurrency(totalIncome)}</p>
            </div>
            <div className="stat-card expense">
                <h4>Tổng Chi Tiêu</h4>
                <p>{formatCurrency(totalExpense)}</p>
            </div>
            <div className="stat-card balance">
                <h4>Số Dư</h4>
                <p>{formatCurrency(balance)}</p>
            </div>
        </div>
    );
}

export default Stats;
