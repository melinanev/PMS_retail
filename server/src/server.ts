import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import path from "path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import sequelize from './config/connection.js';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../env") });
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/dist")));


app.use(routes);


app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;

sequelize.sync({}).then(() => {
  console.log('Main database synced!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
  process.exit(1);  
});
