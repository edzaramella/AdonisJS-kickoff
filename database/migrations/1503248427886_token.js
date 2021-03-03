'use strict';
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Moment = use('moment');

class TokensSchema extends Schema {
    up() {
        this.create('tokens', (table) => {
            table.increments();
            table.integer('user_id')
                 .notNullable()
                 .unsigned()
                 .references('id')
                 .inTable('users')
                 .onDelete('cascade');
            table.string('type')
                 .notNullable();
            table.string('token')
                 .notNullable()
                 .unique();
            table.boolean('is_revoked')
                 .defaultTo(false);
            table.dateTime('expired_at')
                 .notNullable()
                 .defaultTo('2999-12-31 00:00:00');
            table.timestamps();
            table.unique([ 'user_id', 'type' ]);
        });
    }

    down() {
        this.drop('tokens');
    }
}

module.exports = TokensSchema;
