import { Router } from 'express';
import APIRoutes from './api/index.js';

const router = Router();

router.use('/api', APIRoutes);




export default router;
