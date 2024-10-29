import pool from '../config/db.js';

const Event = {
    async createEvent(data) {
      const fields = Object.keys(data);
      const values = Object.values(data);
  
      const query = `
        INSERT INTO events (${fields.join(', ')}) 
        VALUES (${fields.map((_, idx) => `$${idx + 1}`).join(', ')}) 
        RETURNING *
      `;
  
      const result = await pool.query(query, values);
      return result.rows[0];
    },
  
    async getAllEvents(filters) {
      let query = 'SELECT * FROM events';
      const params = [];
      if (filters) {
        const whereClauses = [];
        Object.keys(filters).forEach((key, idx) => {
          whereClauses.push(`${key} = $${idx + 1}`);
          params.push(filters[key]);
          query += ` WHERE ${whereClauses.join(' AND ')}`;
        });
      }
      console.log(query)
      const result = await pool.query(query, params);
      return result.rows;
    },
  
    async getEventById(id) {
      const result = await pool.query('SELECT * FROM events WHERE event_id = $1', [id]);
      return result.rows[0];
    },
  

    async addComment(eventId, userId, comment) {
        const result = await pool.query(
            'INSERT INTO comments (event_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *',
            [eventId, userId, comment]
        );
        return result.rows[0];
    },
};

export default Event;
