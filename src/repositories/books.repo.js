const pool = require('../db/pool');
const env = require('../config/env');

async function listBooks(limit = 20) {
  const sql = `SELECT book_id, title, author, created_at
               FROM app.books
               ORDER BY book_id DESC
               LIMIT $1`;
  const result = await pool.query(sql, [limit]);
  return result.rows;
}

module.exports = {
    listBooks};