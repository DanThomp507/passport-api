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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const multer = __importStar(require("multer"));
const vision = __importStar(require("@google-cloud/vision"));
const app = express();
const upload = multer({ dest: 'uploads/' });
const client = new vision.ImageAnnotatorClient();
function extractDates(file) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield client.textDetection(file.path);
        const text = (_c = (_b = (_a = result.textAnnotations) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.description) !== null && _c !== void 0 ? _c : '';
        const matches = text.match(/(Expiration|Expiry|EXP)[\s:]*([0-9]{2})\/([0-9]{2})\/([0-9]{4})/i);
        const expiryDate = (matches === null || matches === void 0 ? void 0 : matches[2]) + '/' + (matches === null || matches === void 0 ? void 0 : matches[3]) + '/' + (matches === null || matches === void 0 ? void 0 : matches[4]);
        const dobMatches = text.match(/(Date of Birth|DOB)[\s:]*([0-9]{2})\/([0-9]{2})\/([0-9]{4})/i);
        const dob = (dobMatches === null || dobMatches === void 0 ? void 0 : dobMatches[2]) + '/' + (dobMatches === null || dobMatches === void 0 ? void 0 : dobMatches[3]) + '/' + (dobMatches === null || dobMatches === void 0 ? void 0 : dobMatches[4]);
        return { expiryDate, dob };
    });
}
app.post('/extract-dates', upload.single('passportImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { expiryDate, dob } = yield extractDates(req.file);
        res.json({ expiryDate, dob });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
    }
}));
app.listen(3000, () => console.log('Server listening on port 3000...'));
//# sourceMappingURL=index.js.map