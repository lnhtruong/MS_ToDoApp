## 📝 Ứng Dụng To-Do Full-Stack Hiện Đại (PERN Stack Tối Ưu)

Đây là một dự án To-Do đơn giản nhưng được xây dựng trên kiến trúc Full-Stack tiên tiến, sử dụng các thư viện quản lý trạng thái, routing, và fetching dữ liệu hiện đại nhất của hệ sinh thái React.

-----

### 🚀 Công Nghệ Sử Dụng (Tech Stack)

| Thành phần | Công nghệ | Mục đích chính |
| :--- | :--- | :--- |
| **Frontend** | **React, TypeScript** | Xây dựng giao diện người dùng |
| **Quản lý Data** | **TanStack Query (React Query)** | Data Fetching, Caching, Sync, và quản lý Mutations (CRUD) |
| **Routing** | **TanStack Router** | Quản lý định tuyến (Routing) cho các trang chi tiết |
| **UI Components** | **TanStack Table, TanStack Form** | Xử lý Bảng (Danh sách Tasks) và Logic Form phức tạp |
| **Styling** | **Tailwind CSS, shadcn/ui** | Hệ thống thiết kế hiện đại, dễ tùy chỉnh |
| **Backend** | **Express.js (JavaScript)** | API RESTful đơn giản và hiệu suất cao |
| **Cơ sở dữ liệu** | **PostgreSQL** | Lưu trữ dữ liệu Tasks |

-----

### 💡 Chức Năng Chính

Ứng dụng hỗ trợ các tính năng cơ bản của một To-Do list với trải nghiệm người dùng tối ưu nhờ TanStack:

  * **Danh Sách Tasks (TanStack Table):** Hiển thị danh sách tasks với tiêu đề, trạng thái, và các nút thao tác.
  * **Thao Tác CRUD:**
      * **Thêm (Create):** Sử dụng **TanStack Form** để tạo task mới.
      * **Sửa (Update):** Form chỉnh sửa (dùng TanStack Form) nạp dữ liệu từ Query.
      * **Xóa (Delete):** Nút xóa task với xác nhận.
  * **Quản lý State Toàn diện (TanStack Query):** Mọi thao tác API đều được quản lý tự động (fetching, mutations, invalidation).
  * **Điều Hướng (TanStack Router):** Quản lý định tuyến cho các trang Chi tiết Task.

-----

### 1\. ⚙️ Yêu Cầu Hệ Thống

Bạn cần cài đặt các công cụ sau trên máy:

  * **Node.js** (phiên bản `>= 18`)
  * **npm** hoặc yarn/pnpm
  * **Docker** (để khởi chạy cơ sở dữ liệu PostgreSQL)

-----

### 2\. 🛠️ Khởi chạy Backend (Server API)

Chúng ta sẽ sử dụng Docker để khởi tạo cơ sở dữ liệu PostgreSQL.

1.  **Cấu hình và Cài đặt Dependencies:**

      * Đổi tên file `./backend/.env.example` thành `.env`.
      * Di chuyển vào thư mục `backend` và cài đặt dependencies:

    <!-- end list -->

    ```bash
    cd backend
    npm install
    ```

2.  **Khởi tạo Database (PostgreSQL):**

      * Sử dụng Docker để khởi chạy container PostgreSQL (theo cấu hình trong `docker-compose.yml`):

    <!-- end list -->

    ```bash
    docker-compose up -d
    ```

3.  **Khởi chạy Server:**

      * Mở một terminal mới (hoặc sử dụng terminal hiện tại) và chạy lệnh:

    <!-- end list -->

    ```bash
    npm run dev
    # Server API sẽ chạy tại: http://localhost:5000
    ```

-----

### 3\. 🖥️ Khởi chạy Frontend (Client App)

1.  **Cài đặt Dependencies:**

      * Di chuyển vào thư mục `frontend` và cài đặt dependencies:

    <!-- end list -->

    ```bash
    cd frontend
    npm install
    ```

2.  **Khởi chạy Ứng dụng:**

      * Mở một terminal mới (hoặc sử dụng terminal hiện tại) và chạy lệnh:

    <!-- end list -->

    ```bash
    npm run dev
    # Ứng dụng Frontend sẽ chạy tại: http://localhost:5173
    ```

*Vui lòng đảm bảo cả Server Backend (`:5000`) và PostgreSQL đã chạy thành công trước khi truy cập Frontend.*