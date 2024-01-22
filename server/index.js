import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
//securty packges
import helmet from 'helmet';
import dbConnection from './db/index.js';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();
const __dirname = path.resolve(path.dirname(''));
const app = express();
app.use(express.static(path.join(__dirname, 'views')));
const PORT = process.env.PORT || 3000;
dbConnection();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(router);
// Errors Middlewares
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Server Running On Port: ${PORT}`);
});
