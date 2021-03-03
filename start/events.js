'use strict';
//
const Event = use('Event');

// Auth events
Event.on('REGISTER', 'Auth.register');
Event.on('RECOVERY_PASSWORD', 'Auth.recoveryPassword');
