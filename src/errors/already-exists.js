/**
 * Created by crosp on 5/11/17.
 */

'use strict';
const BaseError = require('./base');

class AlreadyExistsError extends BaseError {
    constructor(message) {
        super(message, 409);
    }
}

module.exports = AlreadyExistsError;