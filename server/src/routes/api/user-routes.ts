import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// This gets sources a user by id and excludes passwords in the request

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// This post defines a user by params and sets them for registration 

router.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { username, firstName, lastName, email, password, role }:
  {username: string; firstName: string; lastName: string; email: string; password: string, role: string} = req.body;

  if (!username || !firstName || !lastName|| !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  //This crazy thing ensures the email registration is formatted correctly

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  //This section takes the provided password and hashes it for security

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await User.create({ username, firstName, lastName, email, password: hashedPassword, role });
   return res.status(201).json(newUser);
  } catch (error: any) {
   return res.status(400).json({ message: error.message });
  }
});

// This allows a user to be updated 

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, firstName, lastName, email, role } = req.body;
  if (!username || !firstName || !lastName || !email || !role) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.role = role;
      await user.save();
    return res.json(user);
    } else {
     return res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
   return res.status(400).json({ message: error.message });
  }
});

// This route allows a user to be deleted from the database

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };

