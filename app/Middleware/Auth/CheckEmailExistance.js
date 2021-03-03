'use strict';
const User = use('App/Models/User');

class CheckEmailExistance {
    async handle({ request, response, session }, next) {
        const { email } = request.all();
        const user = await User.findBy('email', email);
        if (!user) {
            session.flash({
                flash_error: 'Email não encontrato! Tente novamente. ',
            });
            return response.redirect('back');
        }
        request.user = user;
        await next();
    }
}

module.exports = CheckEmailExistance;
