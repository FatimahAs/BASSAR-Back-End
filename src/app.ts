import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './utils/logger';
import { dev, port } from './utils/helpers';
import { OK, INTERNAL_SERVER_ERROR } from './utils/http-status';
import { connect } from './config/database';
import { AppError } from './utils/errors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import userRoutes from './routes/user.routes';
import serviceRoutes from './routes/service.routes';
import dangerRoutes from './routes/danger.routes';
import { initSocket } from './socket/notification';
import webhookRoutes from './routes/webhook.routes';

dotenv.config();

const app: Express = express();
const servers = createServer(app);
const io = new Server(servers, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://weather-c3fd.onrender.com'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://weather-c3fd.onrender.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(helmet());
app.use(morgan('tiny', { stream: { write: (message) => logger.info(message.trim())} }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/danger-zones', dangerRoutes);
app.use('/api/webhook', webhookRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(OK).json({ message: 'Bassar API - Welcome!' });
});


// Socket.io
initSocket(io);


// Error handler
app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
  logger.error('Error:', err.message);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(dev && { stack: err.stack })
    });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(dev && { error: err.message, stack: err.stack })
  });
});




// Start server
const server = async () => { await connect();
  servers.listen(port, () => { logger.info(`✅ Server is running at http://localhost:${port}`);});
};

server();
