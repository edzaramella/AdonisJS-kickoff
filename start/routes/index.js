'use strict';
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route');

Route.on('/').render('home.index')
     .as('home');
/**
 * import authentication routes
 */
require('./auth');
