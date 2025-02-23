import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js'
import path from "path";
import { dirname  } from 'node:path';
import {fileURLToPath} from 'node:url';

import sequelize from './config/connection.js';  
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, "../../../env") });
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('../client/dist'));
const PORT = process.env.PORT || 5000;


// Routes
app.use(routes);

app.get('/', (_req, res) => {
  res.send('API is running...');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


sequelize.sync({ force: process.env.NODE_ENV === 'development' }).then(() => {
  console.log('Main database synced!');
}).catch((error) => {
  console.error('Error syncing database:', error);
  process.exit(1);  
});


