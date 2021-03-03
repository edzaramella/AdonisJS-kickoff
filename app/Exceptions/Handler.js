'use strict';
const BaseExceptionHandler = use('BaseExceptionHandler');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    async handle(error, { request, response, session, view }) {
        const isJSON = request.accepts([ 'html', 'json' ]) === 'json';
        // validation exception
        if (error.name === 'ValidationException') {
            session.withErrors(error.messages).flashAll();
            await session.commit();
            response.redirect('back');
            return;
        }
        if (error.name === 'InvalidSessionException') {
            response.redirect('/login');
            return;
        }
        if (error.name === 'InvalidLoginException' || error.name === 'InvalidSessionException') {
            response.redirect('/login');
            return;
        }
        response.status(error.status)
                .send('HANDLER: ' +
                    '- error.name: ' + error.name + ' | ' +
                    '- error.status: ' + error.status + ' | ' +
                    '- error.code: ' + error.code + ' | ' +
                    '- error.message: ' + error.message,
                );
    }

    async report(error, { request }) {
        console.log('- error.name: ' + error.name);
        console.log('- error.status: ', error.status);
        console.log('- error.code: ', error.code);
        console.log('- error.message: ' + error.message);
        console.log('------------');
        console.log(error);
    }
}

module.exports = ExceptionHandler;
