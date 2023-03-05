"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_json_1 = __importDefault(require("./data.json"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
};
const port = process.env.port || 8000;
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.send(data_json_1.default.users.map((user) => {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }));
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:3000`);
});
