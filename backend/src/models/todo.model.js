import pool from '../db/index.js';

export class TodoModel {
  /**
   * Lấy tất cả todo kèm thông tin nhóm
   */
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT 
        t.*,
        g.name AS "groupName",
        g.color AS "groupColor"
      FROM todos t
      LEFT JOIN groups g ON t."groupId" = g.id
      ORDER BY t."createdAt" DESC
    `);
    return rows;
  }

  /**
   * Lấy todo theo ID
   */
  static async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);
    return rows[0] || null;
  }

  /**
   * Tạo todo mới
   */
  static async create({ title, description = '', groupId }) {
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    const { rows } = await pool.query(
      `INSERT INTO todos (title, description, "groupId")
       VALUES ($1, $2, $3)
       RETURNING id, title, description, completed, "groupId", "createdAt", "updatedAt"`,
      [trimmedTitle, trimmedDesc, groupId || null]
    );
    return rows[0];
  }

  /**
   * Cập nhật trạng thái hoàn thành
   */
  static async updateStatus(id, completed) {
    const { rows } = await pool.query(
      `UPDATE todos 
       SET completed = $1, "updatedAt" = NOW()
       WHERE id = $2
       RETURNING id, title, description, completed, "groupId", "createdAt", "updatedAt"`,
      [completed, id]
    );
    return rows[0] || null;
  }

  /**
   * Xóa todo
   */
  static async delete(id) {
    await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
  }
}