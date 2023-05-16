"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = require("dotenv");
const mindee = __importStar(require("mindee"));
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
// Load environment variables
(0, dotenv_1.config)();
// Set up multer storage for file uploads
const storage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
// set up multer instance to process files
const upload = (0, multer_1.default)({ storage: storage });
// initiate mindee client for processing passport data
const mindeeClient = new mindee.Client({
    apiKey: process.env.MINDEE_API_KEY,
});
// Handle file upload with /api/passport route
app.post('/api/passport', upload.single('passport'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Load a file from disk and parse it
        const doc = yield mindeeClient.docFromPath(req.file.path);
        const resp = yield doc.parse(mindee.PassportV1);
        // handle undefined document state
        if (resp.document === undefined)
            return;
        // we only want to return DOB sand expiry date
        const data = {
            birthDate: resp.document.birthDate.value,
            expiryDate: resp.document.expiryDate.value,
        };
        return res.status(200).send(data);
    }
    catch (error) {
        console.error(error);
        console.log(error, 'ERROR!');
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(port, () => console.log(`App listening on port ${port}!`));
