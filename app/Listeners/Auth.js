'use strict';
//
const Env = use('Env');
const Mail = use('Mail');
const app_url = Env.get('APP_URL');
const app_from_title = Env.get('APP_FROM_TITLE');
const app_from_email = Env.get('APP_FROM_EMAIL');
/**
 * Auth Listener
 */
const Auth = (exports = module.exports = {});
/**
 * Register
 */
Auth.register = async (data) => {
    await Mail.send('emails.confirm_email', { app_url, confirmation_token: data.confirmation_token }, (message) => {
        message.from(`${ app_from_title } <${ app_from_email }>`);
        let subject = 'Adonis Starter: seja bem vindo';
        if (data.isResend) {
            subject += ' (reenvio)';
        }
        message.subject(subject);
        message.to(data.email);
    }).catch((e) => {
        console.log('Erro:<', e);
    });
};
/**
 * recoveryPassword
 */
Auth.recoveryPassword = async (data) => {
    await Mail.send('emails.reset_password', { app_url, reset_token: data.reset_token }, (message) => {
        message.from(`${ app_from_title } <${ app_from_email }>`);
        message.subject('Adonis Starter: redefinição de senha');
        message.to(data.email);
    }).catch((e) => {
        console.log('Erro:<', e);
    });
};
