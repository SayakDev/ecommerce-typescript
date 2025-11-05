import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Basic route (health check)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running 🚀' });
});

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // 👈 add this

app.listen(PORT, HOST, () => console.log(`✅ Server running on http://${HOST}:${PORT}`));
