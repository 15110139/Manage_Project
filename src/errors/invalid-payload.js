/**
 * Created by crosp on 5/11/17.
 */

'use strict';
const BaseError = require('./base');

class InvalidPayloadError extends BaseError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = InvalidPayloadError;