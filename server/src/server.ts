import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './routes/api/user-routes.js';
import AuthRoute from './routes/api/auth-routes.js';
import inventoryRouter from './routes/api/inventory-routes.js';
import { workSessionRouter } from './routes/api/work-session-routes.js';
import { authenticateToken } from './middleware/auth.js';


import sequelize from './config/connection.js';  



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


// Routes
app.use('/users', userRouter);
app.use('/auth', AuthRoute);
app.use('/inventory', authenticateToken, inventoryRouter);
app.use('/work-sessions', authenticateToken, workSessionRouter);

app.get('/', (_req, res) => {
  res.send('API is running...');
});



sequelize.sync({ force: process.env.NODE_ENV === 'development' }).then(() => {
  console.log('Main database synced!');
}).catch((error) => {
  console.error('Error syncing database:', error);
  process.exit(1);  
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});