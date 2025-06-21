# Giao diện người dùng - Ứng dụng Quản lý Chi tiêu Cá nhân

Đây là phần frontend cho ứng dụng Quản lý Chi tiêu, được xây dựng bằng React. Giao diện cho phép người dùng đăng ký, đăng nhập, và quản lý các giao dịch của họ một cách trực quan.

## Tính năng chính

* **Giao diện Hiện đại:** Xây dựng trên React, mang lại trải nghiệm người dùng nhanh và mượt mà.
* **Điều hướng Trang đơn (SPA):** Sử dụng `react-router-dom` để chuyển trang mà không cần tải lại.
* **Form Tương tác:** Form đăng ký, đăng nhập và thêm/sửa giao dịch với validation cơ bản.
* **Quản lý Trạng thái:** Sử dụng các hook của React (`useState`, `useEffect`) để quản lý trạng thái của ứng dụng.
* **Giao tiếp với API:** Dùng `axios` để gọi đến các API của backend, xử lý xác thực và các thao tác CRUD.
* **Giao diện người dùng Real-time:** Tự động cập nhật danh sách giao dịch sau khi thêm, sửa, xóa mà không cần refresh trang.

## Công nghệ sử dụng

* **React.js**: Thư viện JavaScript để xây dựng giao diện người dùng.
* **React Router DOM**: Thư viện để xử lý việc điều hướng trang.
* **Axios**: Thư viện để thực hiện các cuộc gọi HTTP đến backend.
* **CSS**: Tùy chỉnh giao diện cho các component.

## Cài đặt và Chạy dự án

1.  Di chuyển vào thư mục frontend:
    ```bash
    cd frontend
    ```

2.  Cài đặt các package cần thiết:
    ```bash
    npm install
    ```
    
3.  Chạy dự án ở chế độ phát triển:
    ```bash
    npm start
    ```

    Ứng dụng sẽ tự động mở trên trình duyệt tại `http://localhost:3000`.

    **Lưu ý:** Cần đảm bảo server backend đang chạy để các tính năng có thể hoạt động đầy đủ.
