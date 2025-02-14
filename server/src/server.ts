import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/api/user-routes';
import { inventoryRouter } from './routes/api/inventory-routes';
import { workSessionRouter } from './routes/api/work-session-routes';
import { authenticateToken } from './middleware/auth';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Routes
app.use('/users', userRouter);
app.use('/inventory', authenticateToken, inventoryRouter);
app.use('/work-sessions', authenticateToken, workSessionRouter);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

