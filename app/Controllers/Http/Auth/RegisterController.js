'use strict';
const Event = use('Event');
const User = use('App/Models/User');

class RegisterController {
    /**
     * showRegister
     */
    async showRegister({ view }) {
        return view.render('auth.register');
    }

    /**
     * postRegister
     */
    async postRegister({ request, response, session }) {
        const { first_name, last_name, email, password } = request.all();
        const user = await User.create({ first_name, last_name, email, password });
        session.flash({
            flash_info:
                `${ first_name }, sua conta foi criada! Por favor, verifique o seu email e confirme para ativá-la. `,
        });
        return response.route('home');
    }

    /**
     * showResendEmail
     */
    async showResendEmail({ view }) {
        return view.render('auth.resend_email');
    }

    /**
     * postResendEmail
     */
    async postResendEmail({ request, response, session }) {
        const { user } = request;
        if (user.is_active) {
            session.flash({ flash_warning: 'Conta já ativada. ' });
            return response.route('login');
        }
        const tokens = await user.tokens()
                                 .where('type', 'confirmation_token')
                                 .fetch();
        if (tokens.rows[0]) {
            const confirmation_token = tokens.rows[0].token;
            if (confirmation_token) {
                Event.fire('REGISTER', { email: user.email, confirmation_token, isResend: true });
                session.flash({
                    flash_info:
                        'Em alguns instantes você receberá um email. Verifique e confirme para ativar sua conta. ',
                });
                return response.route('home');
            }
        }
        //Error
        session.flash({
            flash_error:
                'Oops! houve uma falha.',
        });
        return response.route('home');
    }

    /**
     * confirmEmail
     */
    async confirmEmail({ request, response, session }) {
        const { user } = request;
        if (!user.is_active) {
            user.is_active = true;
            //transaction
            await user.save();
            await user.tokens().delete();
            session.flash({
                flash_success:
                    `${ user.first_name }, pronto! Sua conta já foi ativada. Agora você já pode acessá-la. `,
            });
            return response.route('login');
        }
    }
}

module.exports = RegisterController;
