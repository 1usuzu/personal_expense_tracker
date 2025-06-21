import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    // Kiểm tra xem có thông tin người dùng trong localStorage không
    const user = localStorage.getItem('user');

    if (!user) {
        // Nếu KHÔNG có user, điều hướng ngay lập tức về trang login
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
