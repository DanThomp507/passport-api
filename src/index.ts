import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/index';
import { passportRouter } from './routes/passport.route';

// Load environment variables
config();

if (!process.env.PORT) {
  process.exit(1);
}
const port = process.env.PORT || 3001;
const app = express();

// app config
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/api/passport', passportRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
