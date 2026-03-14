const env = require('../config/env')
const pool = require('../db/pool')

async function createUser(email, name, passwordHash) {
    const sql = `INSERT INTO ${env.dbSchema}.users (email, name, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, email, name, created_at
    `
    const result = await pool.query(sql, [email, name, passwordHash])
    return result.rows[0];
}

module.exports = {
    createUser
}