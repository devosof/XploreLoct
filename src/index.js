import app from './app.js';
import dotenv from 'dotenv';
import knex from 'knex';
import knexConfig from './knexfile.js'; // Assuming you have a knexfile for configurations

dotenv.config();
const port = process.env.PORT || 5000;

// Run migrations
const db = knex(knexConfig.development);
db.migrate.latest().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => console.error('Migration failed', err));
