export async function up(knex) {
    // Users table
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    });
  
    // Events table
    await knex.schema.createTable('events', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.string('country').notNullable();
      table.string('city').notNullable();
      table.string('district');
      table.string('town');
      table.string('place');
      table.string('address');
      table.decimal('latitude', 9, 6);
      table.decimal('longitude', 9, 6);
      table.string('google_maps_link');
      table.enum('gender_allowance', ['MALE', 'FEMALE', 'FAMILY']);
      table.integer('capacity');
      table.string('frequency');
      table.time('time');
      table.integer('duration');
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  
    // Reviews table
    await knex.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('event_id').references('id').inTable('events').onDelete('CASCADE');
      table.text('comment');
      table.integer('rating').notNullable().checkBetween([1, 5]); // assuming rating is from 1 to 5
      table.timestamps(true, true);
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTableIfExists('reviews');
    await knex.schema.dropTableIfExists('events');
    await knex.schema.dropTableIfExists('users');
  }
  