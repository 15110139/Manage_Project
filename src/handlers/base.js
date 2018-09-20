/**
 * Created by crosp on 5/9/17.
 */
const autoBind = require('auto-bind');

// for validate
class BaseValidationClass {
    // check validate body parameters
    /**
     *
     * @param {*} args
     */
    getErrorsParameters(req, bodySchema, querySchema, paramsSchema) {
        let errors = [];
        if (bodySchema) req.checkBody(bodySchema);
        if (querySchema) req.checkQuery(querySchema);
        if (paramsSchema) req.checkParams(paramsSchema);

        return req.getValidationResult().then(result => {
            if (!result.isEmpty()) {
                errors = result.array().map(function(elem) {
                    return elem.msg;
                });
                return errors;
            }
            return errors;
        });
    }
}
module.exports = BaseValidationClass;
