import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

import '../css/pages/AuthForm.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      const userData = { name, email, password };
      await authService.register(userData);

      alert('Đăng ký thành công!');
      navigate('/login');

    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      alert(message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Đăng Ký Tài Khoản</h2>

        <div className="form-group">
          <label>Tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="form-group">
          <label>Xác nhận Mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="form-button">Đăng Ký</button>

        <p className="form-link">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
