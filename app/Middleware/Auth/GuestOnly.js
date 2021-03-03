'use strict';

class GuestOnly {
    async handle({ auth, response, session }, next) {
        try {
            //Adonis method to check if logged in or logged out
            await auth.check();
        } catch (error) {
            //call next to advance the request
            await next();
            return null;
        }
        session.flash({ flash_error: 'Você está conectado!' });
        return response.route('home');
    }
}

module.exports = GuestOnly;
