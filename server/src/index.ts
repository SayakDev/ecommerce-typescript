import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import connectDB from "./config/db_config";
import User from "./models/user.model";

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

app.post("/add-user", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = await User.create({ name, email, age });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
connectDB();

const PORT = Number(process.env.PORT) || 5000;
const HOST = '0.0.0.0'; // 👈 add this

app.listen(PORT, HOST, () => console.log(`✅ Server running on http://${HOST}:${PORT}`));
