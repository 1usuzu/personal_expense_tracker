import React from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>
                    Chào mừng đến với
                    <br />
                    Ứng dụng Quản lý Chi tiêu
                </h1>
                <p>
                    Ghi chép các khoản thu chi hàng ngày của bạn một cách đơn giản và hiệu quả.
                    <br />
                    Theo dõi dòng tiền, phân loại chi tiêu, và đạt được các mục tiêu tài chính của bạn.
                </p>
                <div className="home-actions">
                    <Link to="/login" className="home-btn login-btn">Đăng Nhập</Link>
                    <Link to="/register" className="home-btn register-btn">Đăng Ký</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
