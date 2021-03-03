'use strict';
const Event = use('Event');
const uuid = use('uuid');
const Hash = use('Hash');
const UserHook = module.exports = {};
/**
 *  setDefault (beforeCreate)
 */
UserHook.setDefaults = async (userInstance) => {
    userInstance.role = userInstance.role || 'subscriber';
    userInstance.provider = userInstance.provider || 'web';
};
/**
 * confirmationToken (afterCreate)
 */
UserHook.confirmationToken = async (userInstance) => {
    const { email, first_name } = userInstance;
    const type = 'confirmation_token';
    const confirmation_token = uuid.v1();
    await userInstance.tokens()
                      .create({ type, token: confirmation_token });
    Event.fire('REGISTER', { email, confirmation_token, isResend: false });
};
/**
 * hashPassword (beforeSave)
 */
UserHook.hashPassword = async (userInstance) => {
    if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
    }
};
