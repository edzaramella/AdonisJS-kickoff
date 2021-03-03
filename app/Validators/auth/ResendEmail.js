'use strict';

class ResendEmail {
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
            'email.required': 'Email não informado. ',
            'email.email': 'Email inválido. ',
        };
    }

    get validateAll() {
        return true;
    }
}

module.exports = ResendEmail;
