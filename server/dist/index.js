"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const db_config_1 = __importDefault(require("./config/db_config"));
const user_model_1 = __importDefault(require("./models/user.model"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// Basic route (health check)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running 🚀' });
});
// API Routes
app.use('/api', index_1.default);
app.post("/add-user", async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = await user_model_1.default.create({ name, email, age });
        res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create user" });
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
(0, db_config_1.default)();
const PORT = Number(process.env.PORT) || 5000;
const HOST = '0.0.0.0'; // 👈 add this
app.listen(PORT, HOST, () => console.log(`✅ Server running on http://${HOST}:${PORT}`));
