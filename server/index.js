import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
//securty packges
import helmet from 'helmet';
import dbConnection from './db/index.js';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { addNewOnline, removeUser } from './utils/index.js';

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
app.use(cookieParser(process.env.JWT_SECRET_KEY));

app.use(router);
// Errors Middlewares
app.use(errorMiddleware);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

let onlineUsers = [];

io.on('connection', (socket) => {
  //add new user in array to get his socket id
  socket.on('newUser', (user) => {
    addNewOnline(user, socket.id, onlineUsers);
    console.log('add', onlineUsers);
  });
  //when the user left
  socket.on('close', () => {
    onlineUsers = removeUser(socket.id, onlineUsers);
    console.log('delete', onlineUsers);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Dev Server Running On Port: ${PORT}`);
});
/* app.listen(PORT, () => {
  console.log(`Dev Server Running On Port: ${PORT}`);
}); */
