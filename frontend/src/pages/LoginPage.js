import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

import '../css/pages/AuthForm.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      await authService.login(userData);
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Đã có lỗi xảy ra.';
      alert(message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Đăng Nhập</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <p className="form-link">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>

        <button type="submit" className="form-button">Đăng Nhập</button>
      </form>
    </div>
  );
}

export default LoginPage;
