import express, { Request, Response } from 'express';
import { mindeeClient, upload } from '../config';
import * as mindee from 'mindee';

// define router
export const passportRouter = express.Router();

passportRouter.post(
  '/',
  upload.single('passport'),
  async (req: any, res: any) => {
    console.log(req, 'REQ!');
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
