"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Example route
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the API 👋' });
});
exports.default = router;
