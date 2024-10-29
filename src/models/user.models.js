// import pool from '../config/db.js';

// const User = {
//     async createUser(username, password) {
//         const result = await pool.query(
//             'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
//             [username, password]
//         );
//         return result.rows[0];
//     },

//     async findUserByUsername(username) {
//         const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//         return result.rows[0];
//     },
// };

// export default User;

import pool from '../config/db.js';

const User = {
  async createUser(username, email, password) {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  },

  async findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findUserById(userId) {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  },

  async updateUserProfile(userId, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);

    const query = `
      UPDATE users SET ${fields.map((field, idx) => `${field} = $${idx + 1}`)}
      WHERE user_id = $${fields.length + 1} RETURNING *
    `;

    const result = await pool.query(query, [...values, userId]);
    return result.rows[0];
  },

  async findUserByUsername(username) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },
};

export default User;

