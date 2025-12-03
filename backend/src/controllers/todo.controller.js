import { TodoModel } from '../models/todo.model.js';

export const todoController = {
  // GET /api/todos
  getAll: async (req, res) => {
    try {
      const todos = await TodoModel.getAll();
      res.json(todos);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách todo:', err);
      res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
  },

  // GET /api/todos/:id
  getById: async (req, res) => {
    try {
      const todo = await TodoModel.getById(req.params.id);
      if (!todo) return res.status(404).json({ error: 'Không tìm thấy công việc' });
      res.json(todo);
    } catch (err) {
      console.error('Lỗi khi lấy chi tiết todo:', err);
      res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
  },

  // POST /api/todos
  create: async (req, res) => {
    try {
      const { title, description, groupId } = req.body;

      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Tiêu đề công việc là bắt buộc' });
      }

      const todo = await TodoModel.create({ title, description, groupId });
      res.status(201).json(todo);
    } catch (err) {
      console.error('Lỗi khi tạo todo:', err);
      res.status(500).json({ error: 'Không thể tạo công việc mới' });
    }
  },

  // PATCH /api/todos/:id/status
  toggleStatus: async (req, res) => {
    try {
      const { completed } = req.body;
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Trường "completed" phải là boolean' });
      }

      const todo = await TodoModel.updateStatus(req.params.id, completed);
      if (!todo) return res.status(404).json({ error: 'Không tìm thấy công việc' });

      res.json(todo);
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
      res.status(500).json({ error: 'Không thể cập nhật trạng thái' });
    }
  },

  // DELETE /api/todos/:id
  delete: async (req, res) => {
    try {
      const { rowCount } = await pool.query(`SELECT 1 FROM todos WHERE id = $1`, [req.params.id]);
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Không tìm thấy công việc' });
      }

      await TodoModel.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('Lỗi khi xóa todo:', err);
      res.status(500).json({ error: 'Không thể xóa công việc' });
    }
  },
};