'use strict';

class RecoveryPassword {
    get rules() {
        return {
            email: 'required|email',
        };
    }

    get sanitizationRules() {
        return {
            email: 'normalize_email',
        };
    }

    get messages() {
        return {
            'required': '{{ field }} não informado. ',
            'email.required': 'Email não informado. ',
            'email.email': 'Email inválido. ',
        };
    }

    get validateAll() {
        return true;
    }
}

module.exports = RecoveryPassword;
