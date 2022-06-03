import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import 'dotenv/config';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { CreateGameEvent, GameCreatedEvent, GameJoinedEvent, JoinGameEvent, MoveEvent } from './ws/events';
import crypto from 'crypto';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const env = process.env.NODE_ENV;

console.log(`Server running in ${env} mode!`);

// parse application/json
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Fallback route
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// TEMPORARY, WILL USE DB
const games = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  // Disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Create Game
  socket.on('createGame', (event: CreateGameEvent) => {
    console.log('game created');
    socket.join('testroom');
    // TODO: Database
    games['testroom'] = event.game;
    socket.emit('gameCreated', {
      gameId: 'testroom',
      game: games['testroom'],
      playerId: crypto.randomBytes(8).toString('hex'),
    } as GameCreatedEvent);
  });

  // Join Game
  socket.on('joinGame', (event: JoinGameEvent) => {
    socket.join(event.id);
    console.log('User joined game', event.id);
    socket.emit('gameJoined', {
      gameId: event.id,
      game: games[event.id],
      playerId: crypto.randomBytes(8).toString('hex'),
    } as GameJoinedEvent);
  });

  // Move Made
  socket.on('makeMove', (event: MoveEvent) => {
    // TODO: replace testroom
    console.log('Move made:', event.gameState.board[5][6]);
    socket.to('testroom').emit('moveMade', event);
  });
});

// Express server listening...
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// websockets(httpServer);
