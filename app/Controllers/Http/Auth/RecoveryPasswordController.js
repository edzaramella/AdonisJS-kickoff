'use strict';
const Event = use('Event');
const Moment = use('moment');
const uuid = use('uuid');

class RecoveryPasswordController {
    /**
     * showRecoveryPassword
     */
    async showRecoveryPassword({ view }) {
        return view.render('auth.recovery_password');
    }

    /**
     * postRecoveryPassword
     */
    async postRecoveryPassword({ request, response, session }) {
        const { user } = request;
        const type = 'reset_token';
        const reset_token = uuid.v1();
        const expired_at = Moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
        //transaction
        await user.tokens().where('type', type).delete();
        await user.tokens().create({ type, token: reset_token, expired_at });
        Event.fire('RECOVERY_PASSWORD', { email: user.email, reset_token });
        session.flash({
            flash_info:
                'Em alguns instantes você receberá um email com instruções para redefinir a senha da sua conta. ',
        });
        return response.route('home');
    }

    /**
     *  showResetPassword
     */
    async showResetPassword({ request, view }) {
        const { user, token } = request;
        const email  = user.email;
        const reset_token = token.token;
        return view.render('auth.reset_password', { email, reset_token });
    }

    /**
     * postResetPassword
     */
    async postResetPassword({ request, response, session }) {
        const { password } = request.all();
        const { user } = request;
        user.password = password;
        if (!user.is_active) {
            user.is_active = true;
            session.flash({
                flash_info: `${ user.first_name }, a senha da sua conta foi redefinida e também já foi ativada. `,
            });
        } else {
            session.flash({
                flash_info: `${ user.first_name }, a senha da sua conta foi redefinida. `,
            });
        }
        //transaction
        await user.save();
        await user.tokens().delete();
        return response.route('login');
    }
}

module.exports = RecoveryPasswordController;
