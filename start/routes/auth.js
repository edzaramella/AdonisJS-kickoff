'use strict';
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route');
/**
 * Routes group of logged out
 */
Route.group('logged-out', () => {
    /**
     * Register
     */
    //Register
    Route.get('register', 'Auth/RegisterController.showRegister')
         .as('register');
    //postRegister
    Route.post('register', 'Auth/RegisterController.postRegister')
         .as('postRegister')
         .validator('auth/Register');
    //resendEmail
    Route.get('resend_email', 'Auth/RegisterController.showResendEmail')
         .as('resendEmail');
    //postResendEmail
    Route.post('resend_email', 'Auth/RegisterController.postResendEmail')
         .as('postResendEmail')
         .validator('auth/ResendEmail')
         .middleware('checkEmailExistance');

    //confirmEmail
    Route.get('confirm_email/:confirmation_token', 'Auth/RegisterController.confirmEmail')
         .as('confirmEmail')
         .middleware('checkTokenExistance');
    /**
     * Recovery Password
     */
    //recovevry_password
    Route.get('recovery_password', 'Auth/RecoveryPasswordController.showRecoveryPassword')
         .as('recoveryPassword');
    //postRecoveryPassword
    Route.post('recovery_pasword', 'Auth/RecoveryPasswordController.postRecoveryPassword')
         .as('postRecoveryPassword')
         .validator('auth/RecoveryPassword')
         .middleware('checkEmailExistance');

    //resetPassword
    Route.get('reset_password/:reset_token', 'Auth/RecoveryPasswordController.showResetPassword')
         .as('resetPassword')
         .middleware('checkTokenExistance');
    //postResetPassword
    Route.post('reset_password', 'Auth/RecoveryPasswordController.postResetPassword')
         .as('postResetPassword')
         .validator('auth/ResetPassword')
         .middleware('checkTokenExistance');

    /**
     * LOGIN
     */
    //login
    Route.get('login', 'Auth/AuthController.showlogin')
         .as('login');
    //postLogin
    Route.post('login', 'Auth/AuthController.postLogin')
         .as('postLogin')
         .validator('auth/Login');
}).middleware([ 'guestOnly' ]);
/**
 * routes group of logged in
 */
Route.group('logged-in', () => {
    Route.get('logout', 'Auth/AuthController.logout')
         .as('logout');
}).middleware([ 'authRequired' ]);
