import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import todoRoutes from './routes/todo.routes.js';
import groupRoutes from './routes/group.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/groups', groupRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Không tìm thấy đường dẫn',
    path: req.originalUrl 
  });
});

// Global error handler (tùy chọn thêm sau)
app.use((err, req, res, next) => {
  console.error('Lỗi server:', err);
  res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Backend đang chạy tại http://localhost:${PORT}`);
  console.log(`API Todo: http://localhost:${PORT}/api/todos`);
  console.log(`API Group: http://localhost:${PORT}/api/groups`);
});