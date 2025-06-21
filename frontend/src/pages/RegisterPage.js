import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Form.css';
import authService from '../services/authService';

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
      // Gọi API thông qua authService
      await authService.register(userData);
      
      alert('Đăng ký thành công!');
      // Chuyển hướng người dùng đến trang đăng nhập
      navigate('/login');

    } catch (error) {
      // Xử lý lỗi từ server
      console.error(error);
      // Lấy thông báo lỗi từ response của backend để hiển thị cho người dùng
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