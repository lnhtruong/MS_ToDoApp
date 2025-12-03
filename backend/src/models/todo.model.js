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
      ORDER BY t."groupId" NULLS FIRST, t."order" ASC, t."createdAt" DESC
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
    const trimmedDesc = description?.trim() || '';

    // Lấy order lớn nhất trong group + 1
    const orderResult = await pool.query(`
      SELECT COALESCE(MAX("order"), -1) + 1 AS next_order 
      FROM todos 
      WHERE "groupId" = $1 OR ("groupId" IS NULL AND $1 IS NULL)
    `, [groupId || null]);

    const nextOrder = orderResult.rows[0].next_order || 0;

    const { rows } = await pool.query(
      `INSERT INTO todos (title, description, "groupId", "order")
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, description, completed, "order", "groupId", "createdAt", "updatedAt"`,
      [trimmedTitle, trimmedDesc, groupId || null, nextOrder]
    );
    return rows[0];
  }

  /**
   * Cập nhật todo theo ID
   */
  static async update(id, { title, description, groupId }) {
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(title.trim());
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description?.trim() || '');
    }
    if (groupId !== undefined) {
      updates.push(`"groupId" = $${paramIndex++}`);
      values.push(groupId || null);

      // Nếu đổi group → cần tính lại order trong group mới
      const orderResult = await pool.query(`
        SELECT COALESCE(MAX("order"), -1) + 1 AS next_order 
        FROM todos 
        WHERE "groupId" = $1 OR ("groupId" IS NULL AND $1 IS NULL)
      `, [groupId || null]);
      const nextOrder = orderResult.rows[0].next_order || 0;
      updates.push(`"order" = $${paramIndex++}`);
      values.push(nextOrder);
    }

    if (updates.length === 0) return null;

    updates.push(`"updatedAt" = NOW()`);
    values.push(id);

    const query = `
      UPDATE todos 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING id, title, description, completed, "order", "groupId", "createdAt", "updatedAt"
    `;

    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  }

  /**
   * Cập nhật trạng thái hoàn thành
   */
  static async updateStatus(id, completed) {
    const { rows } = await pool.query(
      `UPDATE todos 
       SET completed = $1, "updatedAt" = NOW()
       WHERE id = $2
       RETURNING id, title, description, completed, "order", "groupId", "createdAt", "updatedAt"`,
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

  /**
   * Sắp xếp lại thứ tự todo
   */
  static async reorder(items) {
    if (!Array.isArray(items) || items.length === 0) return;

    await pool.query('BEGIN');

    for (const { id, order } of items) {
      await pool.query(
        `UPDATE todos SET "order" = $1, "updatedAt" = NOW() WHERE id = $2`,
        [order, id]
      );
    }

    await pool.query('COMMIT');
  }
}