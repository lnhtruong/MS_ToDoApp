// Tạo QueryClient để quản lý cache và trạng thái của các truy vấn dữ liệu
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    // Đọc dữ liệu
    queries: {
      staleTime: 1000 * 30,         // 30s - Thời gian dữ liệu được coi là "fresh"
      gcTime: 1000 * 60 * 5,        // 5min - Thời gian giữ cache trước khi xóa
      retry: 1,                     // Số lần thử lại khi request fail
      refetchOnWindowFocus: false,  // Không tự động fetch lại khi focus window
    },
    // Thay đổi dữ liệu
    mutations: {
      retry: 0,                     // Không retry khi mutation fail
    },
  },
})