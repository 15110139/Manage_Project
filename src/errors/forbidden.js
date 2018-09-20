/**
 * Created by crosp on 5/11/17.
 */

'use strict';
const BaseError = require('./base');

class ForbiddenError extends BaseError {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = ForbiddenError;