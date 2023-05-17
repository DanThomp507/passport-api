import { config } from 'dotenv';
import multer from 'multer';
import * as mindee from 'mindee';

config();

export const { PORT, MINDEE_API_KEY } = process.env;

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// set up multer instance to process files
const upload = multer({ storage: storage });

// initiate mindee client for processing passport data
const mindeeClient = new mindee.Client({
  apiKey: process.env.MINDEE_API_KEY,
});

export { storage, upload, mindeeClient };
