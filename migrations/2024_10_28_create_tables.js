import knex from 'knex';

export async function up(knex) {
    await knex.schema.hasTable('users').then(exists => {
        if (!exists) {
            return knex.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('username').notNullable();
                table.string('email').notNullable().unique();
                table.string('password').notNullable();
                table.timestamps(true, true);
            });
        }
    });

    await knex.schema.hasTable('events').then(exists => {
        if (!exists) {
            return knex.schema.createTable('events', (table) => {
                table.increments('event_id').primary();
                table.string('name').notNullable();
                table.text('description');
                table.string('country');
                table.string('city');
                table.string('district');
                table.string('town');
                table.string('place');
                table.string('address');
                table.decimal('latitude', 10, 7);
                table.decimal('longitude', 10, 7);
                table.string('google_maps_link');
                table.integer('frequency');
                table.integer('capacity');
                table.enum('gender_allowance', ['MALE', 'FEMALE', 'FAMILY']);
                table.time('time');
                table.integer('duration');
                table.timestamps(true, true);
            });
        }
    });

    await knex.schema.hasTable('comments').then(exists => {
        if (!exists) {
            return knex.schema.createTable('comments', (table) => {
                table.increments('comment_id').primary();
                table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
                table.integer('event_id').references('event_id').inTable('events').onDelete('CASCADE');
                table.text('content').notNullable();
                table.integer('rating').notNullable();
                table.timestamps(true, true);
            });
        }
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists('comments');
    await knex.schema.dropTableIfExists('events');
    await knex.schema.dropTableIfExists('users');
}
