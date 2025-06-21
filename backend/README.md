# API Backend - Ứng dụng Quản lý Chi tiêu Cá nhân

Đây là phần backend API cho ứng dụng Quản lý Chi tiêu, được xây dựng bằng Node.js và Express. API này cung cấp các endpoint để xác thực người dùng và thực hiện các thao tác CRUD (Create, Read, Update, Delete) cho các giao dịch.

## Tính năng chính

* **Xác thực người dùng:** Đăng ký, Đăng nhập bằng JWT (JSON Web Token).
* **Bảo vệ Routes:** Các endpoint quan trọng được bảo vệ, chỉ người dùng đã đăng nhập mới có thể truy cập.
* **Quản lý Giao dịch:**
    * Thêm giao dịch mới (thu/chi).
    * Lấy danh sách tất cả giao dịch của người dùng.
    * Cập nhật thông tin một giao dịch.
    * Xóa một giao dịch.

## Công nghệ sử dụng

* **Node.js**: Môi trường chạy JavaScript phía server.
* **Express.js**: Framework để xây dựng API.
* **MongoDB**: Cơ sở dữ liệu NoSQL để lưu trữ dữ liệu.
* **Mongoose**: Thư viện giúp làm việc với MongoDB một cách có cấu trúc.
* **JSON Web Token (JWT)**: Dùng cho việc xác thực.
* **bcrypt.js**: Dùng để mã hóa mật khẩu.
* **cors**: Xử lý Cross-Origin Resource Sharing.

## Cài đặt và Chạy dự án

1.  Clone repository (nếu có) và di chuyển vào thư mục backend:
    ```bash
    cd backend
    ```

2.  Cài đặt các package cần thiết:
    ```bash
    npm install
    ```

3.  Tạo file `.env` ở thư mục gốc của `backend` và điền các biến môi trường cần thiết.
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```
    
4.  Chạy dự án ở chế độ phát triển (với nodemon):
    ```bash
    npm run dev
    ```

    Server sẽ chạy tại `http://localhost:5000`.

## Các Endpoints của API

### Auth Routes (`/api/auth`)
* `POST /register`: Đăng ký người dùng mới.
* `POST /login`: Đăng nhập và nhận về token.

### Transaction Routes (`/api/transactions`)
* `GET /`: Lấy tất cả giao dịch của người dùng đã đăng nhập (Private).
* `POST /`: Thêm một giao dịch mới (Private).
* `PUT /:id`: Cập nhật một giao dịch theo ID (Private).
* `DELETE /:id`: Xóa một giao dịch theo ID (Private).
