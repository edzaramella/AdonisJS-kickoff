'use strict';
const Hash = use('Hash');
const User = use('App/Models/User');

class AuthController {
    /**
     * login
     */
    async showlogin({ view }) {
        return view.render('auth.login');
    }

    /**
     * postLogin
     */
    async postLogin({ request, session, response, auth }) {
        const { email, password, remember } = request.all();
        const user = await User.findBy('email', email);
        if (user) {
            if (!user.is_active) {
                session.flash({
                    flash_error:
                        `${ user.first_name }, sua conta ainda não foi ativada. Por favor, confirme o seu email. `,
                });
                return response.redirect('back');
            }
            const checkedPassword = await Hash.verify(password, user.password);
            if (checkedPassword) {
                await user.tokens().delete();
                await auth.remember(!!remember).login(user);
                session.flash({
                    flash_success: `${ auth.user.first_name }, seja bem vindo de volta!`,
                });
                return response.route('home');
            }
        }
        session.flash({
            flash_error: 'Conta não existe ou senha inválida. Tente novamente! ',
        });
        return response.redirect('back');
    }

    /**
     * logout
     */
    async logout({ response, session, auth }) {
        session.flash({ flash_info: 'Você não está mais conectado. ' });
        await auth.logout();
        return response.route('home');
    }
}

module.exports = AuthController;
