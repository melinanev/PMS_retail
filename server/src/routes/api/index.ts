import { Router } from 'express';
import { userRouter } from './user-routes.js';
import AuthRoute from './auth-routes.js';
import InventoryRoutes from './inventory-routes.js'
import { workSessionRouter } from './work-session-routes.js';
import { authenticateToken } from '../../middleware/auth.js';




const router = Router();

router.use('/users', userRouter);
router.use('/auth', AuthRoute);
router.use('/inventory', InventoryRoutes);
router.use('/work-sessions', authenticateToken, workSessionRouter);


export default router;