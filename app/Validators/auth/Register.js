'use strict';

class Register {
    get rules() {
        return {
            first_name: 'required',
            last_name: 'required',
            email: 'required|email|unique:users',
            password: 'required|confirmed',
            password_confirmation: 'required',
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
            'first_name.required': 'Nome não informado. ',
            'last_name.required': 'Sobrenome não informado. ',
            'email.required': 'Email não informado. ',
            'email.email': 'Email inválido. ',
            'email.unique': 'Já existe uma conta com esse email. ',
            'password.required': 'Senha não informada. ',
            'password.confirmed': '\'Confirmação da senha\'  deve ser igual a  \'Senha\'. ',
            'password_confirmation.required': '\'Confirmação da senha\'  não informado.',
        };
    }

    get validateAll() {
        return true;
    }
}

module.exports = Register;
