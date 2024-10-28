import pool from '../config/db.js';

const Event = {
    async createEvent(name, description, userId, imageUrl) {
        const result = await pool.query(
            'INSERT INTO events (name, description, user_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, userId, imageUrl]
        );
        return result.rows[0];
    },

    async getAllEvents() {
        const result = await pool.query('SELECT * FROM events');
        return result.rows;
    },

    async getEventById(id) {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
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
