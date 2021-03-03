'use strict';

class ResetPassword {
    get rules() {
        return {
            password: 'required|confirmed',
            password_confirmation: 'required',
        };
    }

    get messages() {
        return {
            'password.required': 'Informe uma nova senha para sua conta.',
            'password.confirmed': '\'Confirmação da senha\'  deve ser igual a  \'Senha\'. ',
            'password_confirmation.required': '\'Confirmação da senha\'  não informado.',
        };
    }

    get validateAll() {
        return true;
    }
}

module.exports = ResetPassword;
