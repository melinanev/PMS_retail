import express from 'express';
import { workSession } from '../../models/work-session';
import { authenticateToken } from '../../middleware/auth.js';
import { JwtPayload } from 'jsonwebtoken';

const router = express.Router();

// This logic handles the clockin, verifies user isnt already clocked in, and creates a new session with a timestamp
router.post('/clock-in', authenticateToken, async (req, res) => {
  try {
    const userId = (req.user as JwtPayload).id;

    const activeSession = await workSession.findOne({
      where: { employee_id: userId, clock_out: null },
    });

    if (activeSession) {
      return res.status(400).json({ message: 'Already clocked in' });
    }

    const newSession = await workSession.create({ employee_id: userId, clock_in: new Date() });
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: 'Error clocking in' });
  }
});

// This finds the active work session and ends it adding an updated timestamp
router.post('/clock-out', authenticateToken, async (req, res) => {
  try {
    const userId = (req.user as JwtPayload).id;

    const session = await workSession.findOne({
      where: { employee_id: userId, clock_out: null },
    });

    if (!session) {
      return res.status(400).json({ message: 'No active session found' });
    }

    session.clock_out = new Date();
    await session.save();

    res.json({ message: 'Clocked out successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Error clocking out' });
  }
});

export { router as workSessionRouter };


