import app from './app.js';
import dotenv from 'dotenv';
import knex from 'knex';
import config from '../knexfile.js'; // Assuming you have a knexfile for configurations

dotenv.config({
    path: './.env'
});


const port = process.env.PORT || 5000;
const db = knex(config);

// Run migrations
db.migrate.latest().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => console.error('Migration failed', err));
