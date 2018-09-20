/**
 * Created by crosp on 5/11/17.
 */

'use strict';
const BaseError = require('./base');

class NotFoundError extends BaseError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = NotFoundError;