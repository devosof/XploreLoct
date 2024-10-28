import knex from 'knex';

exports.up = async (knex) => {
    await knex.schema
        .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable().unique();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.timestamps(true, true);
        })
        .createTable('events', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.text('description').notNullable();
            table.string('country').notNullable();
            table.string('city').notNullable();
            table.string('district').notNullable();
            table.string('town').notNullable();
            table.string('place').notNullable();
            table.float('latitude').notNullable();
            table.float('longitude').notNullable();
            table.string('google_maps_link').notNullable();
            table.integer('capacity').notNullable();
            table.string('gender_allowance').notNullable();
            table.time('time').notNullable();
            table.integer('duration').notNullable();
            table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
            table.timestamps(true, true);
        })
        .createTable('comments', (table) => {
            table.increments('id').primary();
            table.integer('event_id').references('id').inTable('events').onDelete('CASCADE');
            table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
            table.text('comment').notNullable();
            table.timestamps(true, true);
        });
};

exports.down = async (knex) => {
    await knex.schema
        .dropTableIfExists('comments')
        .dropTableIfExists('events')
        .dropTableIfExists('users');
};
