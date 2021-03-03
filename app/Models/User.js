'use strict';


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
    static get hidden() {
        return [ 'password' ];
    }

    static get roles() {
        return [ 'admin', 'manager', 'user', 'subscriber' ];
    }

    static boot() {
        super.boot();
        this.addHook('beforeCreate', 'UserHook.setDefaults');
        this.addHook('beforeSave', 'UserHook.hashPassword');
        this.addHook('afterCreate', 'UserHook.confirmationToken');
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens() {
        return this.hasMany('App/Models/Token');
    }
}

module.exports = User;
