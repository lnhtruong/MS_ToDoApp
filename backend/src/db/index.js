import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'production' && {
    ssl: { rejectUnauthorized: false }
  })
});

// Xử lý lỗi kết nối bất ngờ
pool.on('error', (err) => {
  console.error('Lỗi kết nối PostgreSQL không mong muốn:', err);
  process.exit(1);
});

export default pool;