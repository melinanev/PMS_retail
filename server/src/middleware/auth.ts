import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//This is where we apply the JWT tokens payload

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

interface JwtPayload {
  id: number;
  username: string;
  role: 'manager' | 'employee';
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({ message: 'Internal server error: JWT_SECRET_KEY is not defined' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = decoded as JwtPayload;
    return next();
  });
};

// The variable defines the logic to authenticate the manager 
export const authorizeManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Forbidden: Managers only' });
  }
  next();
};

// This logic checks if the user is a manager by role type
export const isManager = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'manager') {
    return res.status(403).json({ message: 'Only managers have access' });
  }
  next();
};

