'use strict';

class AuthRequired {
    async handle({ auth, response, session }, next) {
        //To prevent user clicking BACK button and seeing the cache before
        response.header('Cache-Control', 'nocache, no-store, max-age=0, must-revalidate');
        response.header('Pragma', 'no-cache');
        response.header('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT');
        try {
            //Adonis method to check if logged in or logged out
            await auth.check();
        } catch (error) {
            session.flash({ flash_error: 'Acesso não autorizado!' });
            return response.route('login');
        }
        //call next to advance the request
        await next();
    }
}

module.exports = AuthRequired;
