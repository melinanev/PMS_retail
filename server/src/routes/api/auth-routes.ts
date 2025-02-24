import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.js';  // Adjust the path as needed

const router = express.Router();

// Register route
router.post("/register", async (req: Request, res: Response) => {
  const { username, password, firstName, lastName, email, role } = req.body;

  if (!username || !password || !email || !firstName || !lastName) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: "Username already taken" });


    const newUser = await User.create({
      username,
      password,
      firstName,
      lastName,
      email,
      role
    });

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error});
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "Authentication failed" });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", passwordIsValid);

    if (!passwordIsValid) return res.status(401).json({ message: "Authentication failed" });

    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: "1h" });

    return res.json({
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
});




export default router;
