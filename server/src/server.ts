const forceDatabaseRefresh = false;
import sequelize from './config/connection.js';
import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/api/user-routes.js';
import  AuthRoute from './routes/api/auth-routes.js';
import { inventoryRouter } from './routes/api/inventory-routes.js';
import { workSessionRouter } from './routes/api/work-session-routes.js';
import { authenticateToken } from './middleware/auth.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


// Routes
app.use('/users', userRouter);
app.use('/auth', AuthRoute);
app.use('/inventory', authenticateToken, inventoryRouter);
app.use('/work-sessions', authenticateToken, workSessionRouter);

app.get('/', (_req, res) => {
  res.send('API is running...');
});
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
});
