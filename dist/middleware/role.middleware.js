"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
// factory function to create middleware for required roles
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized: No user info' });
            return;
        }
        if (req.user.role !== role) {
            res.status(403).json({ message: `Access denied: ${role} role required` });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
