"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
const data = fs_1.default.readFileSync('file/countries.txt', {
    encoding: 'utf8',
    flag: 'r',
});
app.get('/', (req, res) => {
    res.send('this is the txt file: ' + data);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Example app listening on port ${port}`);
    console.log(data);
});
//# sourceMappingURL=index.js.map