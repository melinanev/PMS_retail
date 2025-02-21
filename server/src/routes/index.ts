import { Router } from 'express';
import authRoutes from './api/auth-routes.js';
import inventoryRoutes from './api/inventory-routes.js'
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/authToken', authenticateToken);


export default router;
