import { Router } from 'express';
import authRoutes from './api/auth-routes';
//import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);


export default router;
