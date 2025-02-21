import { Router } from 'express';
import APIRoutes from './api/index.js';
import {join, dirname  } from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.use('/api', APIRoutes);
router.get('*',(_req, res) => {
    res.sendFile(join(__dirname,"../../../client/index.html"))
})



export default router;
