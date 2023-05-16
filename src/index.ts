import express from 'express';
import multer from 'multer';
import { config } from 'dotenv';
import * as mindee from 'mindee';

const port = process.env.PORT || 3001;
const app = express();

// Load environment variables
config();

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

// Handle file upload with /api/passport route
app.post(
  '/api/passport',
  upload.single('passport'),
  async (req: any, res: any) => {
    try {
      // Load a file from disk and parse it
      const doc = await mindeeClient.docFromPath(req.file.path);
      const resp = await doc.parse(mindee.PassportV1);

      // handle undefined document state
      if (resp.document === undefined) return;

      // we only want to return DOB sand expiry date
      const data = {
        birthDate: resp.document.birthDate.value,
        expiryDate: resp.document.expiryDate.value,
      };

      return res.status(200).send(data);
    } catch (error) {
      console.error(error);
      console.log(error, 'ERROR!');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

app.listen(port, () => console.log(`App listening on port ${port}!`));
