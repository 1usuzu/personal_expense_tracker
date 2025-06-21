import axios from 'axios';

const API = axios.create({
  baseURL: 'https://personal-expense-tracker-q886.onrender.com',
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    // Nếu có người dùng trong localStorage, lấy token và đính kèm vào header
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
