import { Request, Response, NextFunction } from 'express';


interface AuthRequest extends Request {
  user?: {
    role: string;
  };
}

// factory function to create middleware for required roles
export const requireRole = (role: 'admin' | 'helper' | 'user') => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
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
