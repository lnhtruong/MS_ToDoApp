# Ứng Dụng To-Do Full-Stack Hiện Đại
Dự án này là một ứng dụng To-Do đơn giản, được xây dựng với kiến trúc Full-Stack hiện đại:
- **Frontend:** React, TypeScript, TanStack Router, TanStack Query, TanStack Table, TanStack Form, Tailwind CSS.
- **Backend:** Express.js (JavaScript) với API RESTful đơn giản.


## 1. Yêu Cầu Hệ Thống
Bạn cần cài đặt:
- Node.js (phiên bản >= 18)
- npm hoặc yarn/pnpm


## 2. Thiết Lập Backend (Server)
1. Tạo một thư mục mới cho backend, ví dụ: `todo-backend`.

2. Lưu file `server.js` vào thư mục này.

3. Mở Terminal tại thư mục `todo-backend` và chạy các lệnh sau:
```bash
npm init -y
npm install express cors
node server.js
# Server sẽ chạy tại http://localhost:3000
```


## 3. Thiết Lập Frontend (Client)
1. **Tạo một dự án React mới (ví dụ, với Vite):**
```bash
npm create vite@latest todo-frontend -- --template react-ts
cd todo-frontend
```

2. **Cài đặt các thư viện cần thiết:**
```bash
npm install @tanstack/react-router @tanstack/react-query @tanstack/react-table @tanstack/react-form
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
*Lưu ý: Bạn sẽ cần thiết lập Tailwind CSS trong dự án Vite của mình.*

3. **Thay thế nội dung của file `src/App.tsx` bằng mã nguồn tôi cung cấp.**

4. **Chạy ứng dụng Frontend:**
```bash
npm run dev
# Client sẽ chạy tại http://localhost:5173 (hoặc cổng khác)
```


## 4. Chức Năng Chính
- **Danh Sách Tasks:** Sử dụng TanStack Table, hiển thị tiêu đề, trạng thái, và các nút thao tác.
- **Chi Tiết Task:** Trang riêng để xem chi tiết mô tả và tiêu đề.
- **Thao Tác CRUD:**
    - ***Thêm (Create):*** Form tạo task mới dùng TanStack Form.
    - ***Sửa (Update):*** Form chỉnh sửa dùng TanStack Form, nạp dữ liệu từ Query.
    - ***Xóa (Delete):*** Nút xóa task với xác nhận.
- **Quản lý State:** Mọi thao tác API đều được quản lý bằng TanStack Query (fetching, mutations, invalidation).
- **Điều Hướng:** Sử dụng TanStack Router để quản lý các trang.