import React, { useState } from 'react';
import '../css/components/Filters.css';

function Filters({ onFilterChange }) {
    const [frequency, setFrequency] = useState('all');
    const [type, setType] = useState('all');

    const handleApplyFilters = () => {
        onFilterChange({ frequency, type });
    };

    return (
        <div className="filters-container">
            <div className="filter-group">
                <label>Khoảng thời gian:</label>
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                    <option value="7">7 ngày qua</option>
                    <option value="30">30 ngày qua</option>
                    <option value="365">1 năm qua</option>
                    <option value="all">Tất cả</option>
                </select>
            </div>
            <div className="filter-group">
                <label>Loại:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="income">Thu nhập</option>
                    <option value="expense">Chi tiêu</option>
                </select>
            </div>
            <button onClick={handleApplyFilters} className="apply-btn">Áp dụng</button>
        </div>
    );
}

export default Filters;
