import { GroupModel } from '../models/group.model.js';
import pool from '../db/index.js';

// Danh sách màu Tailwind hợp lệ
const VALID_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
];

export const groupController = {
  // GET /api/groups
  getAll: async (req, res) => {
    try {
      const groups = await GroupModel.getAll();
      res.json(groups);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách nhóm:', err);
      res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
  },

  // POST /api/groups
  create: async (req, res) => {
    try {
      const { name, color } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Tên nhóm là bắt buộc và không được để trống' });
      }

      if (color && !VALID_COLORS.includes(color)) {
        return res.status(400).json({ 
          error: 'Màu không hợp lệ',
          validColors: VALID_COLORS 
        });
      }

      const group = await GroupModel.create({ name, color });
      res.status(201).json(group);
    } catch (err) {
      console.error('Lỗi khi tạo nhóm:', err);
      res.status(500).json({ error: 'Không thể tạo nhóm' });
    }
  },

  // PATCH /api/groups/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, color } = req.body;

      if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
        return res.status(400).json({ error: 'Tên nhóm không được để trống' });
      }

      if (color && !VALID_COLORS.includes(color)) {
        return res.status(400).json({ 
          error: 'Màu không hợp lệ',
          validColors: VALID_COLORS 
        });
      }

      const updatedGroup = await GroupModel.update(id, { name, color });

      if (!updatedGroup) {
        return res.status(404).json({ error: 'Không tìm thấy nhóm' });
      }

      res.json(updatedGroup);
    } catch (err) {
      console.error('Lỗi khi cập nhật nhóm:', err);
      res.status(500).json({ error: 'Không thể cập nhật nhóm' });
    }
  },

  // DELETE /api/groups/:id
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      // Kiểm tra tồn tại (tối ưu hơn so với getAll)
      const { rowCount } = await pool.query(`SELECT 1 FROM groups WHERE id = $1`, [id]);
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Không tìm thấy nhóm' });
      }

      await GroupModel.delete(id);
      res.status(204).send();
    } catch (err) {
      console.error('Lỗi khi xóa nhóm:', err);
      res.status(500).json({ error: 'Không thể xóa nhóm' });
    }
  },
};