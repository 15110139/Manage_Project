/**
 * Created by crosp on 5/11/17.
 */

'use strict';
const BaseError = require('./base');

class UnauthorizedError extends BaseError {
    constructor(message) {
        super(message, 401);
    }
}

module.exports = UnauthorizedError;