import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Define the JWT payload structure
interface JwtPayload {
  id: number;
  username: string;
  role: 'manager' | 'employee';
}

// Middleware to authenticate JWT tokens
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  // Check if the JWT secret key is defined
  if (!secretKey) {
    return res.status(500).json({ message: 'Internal server error: JWT_SECRET_KEY is not defined' });
  }

  // Verify the token
  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    // Attach the decoded payload to the request object
    req.user = decoded as JwtPayload;
   
    return next();
    // Explicitly return to satisfy TypeScript
  });
};

// Middleware to authorize manager-only access
export const authorizeManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Forbidden: Managers only' });
  }
  next();
  return; // Explicitly return to satisfy TypeScript
};

