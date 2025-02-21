import { Router, Request, Response } from "express";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_jwt_secret";

// This does the registering 
router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // This hashes and salts our password
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

   return res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error: any) {
   return res.status(500).json({ message: "Error registering user", error: error.message });
  }
});


router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  try {
    // Finds a username in our DB
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "Authentication failed" });

    // Compares the input to saved passwords
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: "Authentication failed" });

    // Generates JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

   return res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error: any) {
   return res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

export default router;
