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

async function getBookByID(id) {
  const sql = `SELECT book_id, title, author, created_at
               FROM app.books
               WHERE book_id = $1`;
  const result = await pool.query(sql, [id])
  return result.rows[0]
}

async function createBook(title, author) {
    const sql = `INSERT INTO ${env.dbSchema}.books(title, author)
                 VALUES ($1, $2)
                 RETURNING book_id, title, author, created_at`;
    const result = await pool.query(sql, [title, author])
    
    console.log(result);
    
    return result
}

module.exports = {
    listBooks,
    createBook,
    getBookByID
  };