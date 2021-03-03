'use strict';

class Login {
    get rules() {
        return {
            email: 'required|email',
            password: 'required',
        };
    }

    get sanitizationRules() {
        return {
            email: 'normalize_email',
        };
    }

    get messages() {
        return {
            'email.required': 'Email não informado. ',
            'email.email': 'Email inválido. ',
            'password.required': 'Senha não informada. ',
        };
    }

    get validateAll() {
        return true;
    }
}

module.exports = Login;
