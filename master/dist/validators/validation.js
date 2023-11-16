"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOject = void 0;
const validateOject = (schema) => {
    const validateMiddleware = (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({ error: true, message: error.message });
        }
        next();
    };
    return validateMiddleware;
};
exports.validateOject = validateOject;