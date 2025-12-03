import pool from '../db/index.js';

export class GroupModel {
  /**
   * Lấy tất cả nhóm kèm số lượng todo chưa hoàn thành
   */
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT 
        g.*,
        COUNT(t.id) AS "todoCount"
      FROM groups g
      LEFT JOIN todos t ON t."groupId" = g.id AND t.completed = false
      GROUP BY g.id
      ORDER BY g."createdAt" ASC
    `);
    return rows;
  }

  /**
   * Tạo nhóm mới
   */
  static async create({ name, color = 'bg-blue-500' }) {
    const trimmedName = name.trim();
    const { rows } = await pool.query(
      `INSERT INTO groups (name, color) 
       VALUES ($1, $2) 
       RETURNING *`,
      [trimmedName, color]
    );
    return rows[0];
  }

  /**
   * Cập nhật nhóm theo ID
   */
  static async update(id, { name, color }) {
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name.trim());
    }
    if (color !== undefined) {
      updates.push(`color = $${paramIndex++}`);
      values.push(color);
    }

    if (updates.length === 0) return null;

    updates.push(`"updatedAt" = NOW()`);
    values.push(id);

    const query = `
      UPDATE groups 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }

  /**
   * Xóa nhóm - chuyển todo về nhóm mặc định (NULL)
   */
  static async delete(id) {
    await pool.query(`UPDATE todos SET "groupId" = NULL WHERE "groupId" = $1`, [id]);
    await pool.query(`DELETE FROM groups WHERE id = $1`, [id]);
  }
}