'use strict';
const Moment = use('moment');
const Token = use('App/Models/Token');

class CheckTokenExistance {
    async handle({ request, response, session, params }, next) {
        let user;
        let tokenType;
        let tokenValue;
        if (request.hasBody()) {
            const all = request.all();
            tokenType = Object.keys(all)[1];
            tokenValue = Object.values(all)[1];
        } else {
            tokenType = Object.keys(params)[0];
            tokenValue = Object.values(params)[0];
        }
        if (tokenType && tokenValue) {
            const token = await Token.findBy('token', tokenValue);
            if (token &&
                token.type === tokenType &&
                token.expired_at > Moment().format('YYYY-MM-DD HH:mm:ss')
            ) {
                user = await token.user().fetch();
                if (user) {
                    request.user = user;
                    request.token = token;
                    await next();
                    return null;
                }
            }
        }
        session.flash({ flash_error: 'Token expirado ou inválido' });
        return response.route('home');
    }
}

module.exports = CheckTokenExistance;
