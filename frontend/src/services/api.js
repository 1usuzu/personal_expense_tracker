import axios from 'axios';

// Định nghĩa URL cho hai môi trường
const productionUrl = 'https://personal-expense-tracker-q886.onrender.com/api';
const developmentUrl = 'http://localhost:5000/api';

// Sử dụng toán tử 3 ngôi để chọn URL dựa trên môi trường
const API_URL = process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl;

// Tạo axios instance với baseURL đã được chọn đúng
const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
