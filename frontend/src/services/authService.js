import API from './api';

// Hàm gửi yêu cầu đăng ký
const register = (userData) => {
  return API.post('auth/register', userData);
};

// Hàm gửi yêu cầu đăng nhập
const login = async (userData) => {
  const response = await API.post('auth/login', userData);

  // Nếu có dữ liệu trả về (đăng nhập thành công)
  if (response.data) {
    // Lưu thông tin người dùng (bao gồm token) vào localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Hàm đăng xuất
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
