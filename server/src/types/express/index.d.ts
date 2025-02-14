// src/types/express.d.ts

import { JwtPayload } from '../middleware/auth'; 

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
