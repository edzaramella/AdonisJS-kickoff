'use strict';
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments();
            table.string('email')
                 .notNullable()
                 .unique();
            table.string('password', 20)
                 .notNullable();
            table.string('first_name');
            table.string('last_name');
            table.string('provider')
                 .notNullable();
            table.string('role')
                 .notNullable()
                 .defaultTo('user');
            table.boolean('is_active')
                 .notNullable()
                 .defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop('users');
    }
}

module.exports = UserSchema;
