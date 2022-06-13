import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import 'dotenv/config';
import { Server } from 'socket.io';
import { createServer } from 'http';
import {
  CreateGameEvent,
  GameCreatedEvent,
  GameJoinedEvent,
  JoinGameEvent,
  MoveEvent,
  PlayerJoinedGameEvent,
} from './ws/events';
import crypto from 'crypto';
import { PlayerColour, PlayerAtCreation, UserInfo } from './client/src/types';
import { GameState } from './client/src/state/slices/game/slice';

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
const games = {} as GameState[];
const users = {} as UserInfo[];

io.on('connection', (socket) => {
  console.log('a user connected');
  // Disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Create Game
  socket.on('createGame', (event: CreateGameEvent) => {
    const newGameId = crypto.randomBytes(8).toString('hex');
    console.log('Created game:', newGameId);
    socket.join(newGameId);
    // TODO: Database
    let newPlayerColour: PlayerColour;
    if (event.game.creatorColour === PlayerAtCreation.random) {
      if (Math.random() < 0.5) {
        newPlayerColour = PlayerColour.light;
      } else {
        newPlayerColour = PlayerColour.dark;
      }
    } else {
      if (event.game.creatorColour === PlayerAtCreation.dark) newPlayerColour = PlayerColour.dark;
      if (event.game.creatorColour === PlayerAtCreation.light) newPlayerColour = PlayerColour.light;
    }
    games[newGameId] = event.game;
    const newPlayer = {
      name: event.playerName,
      id: crypto.randomBytes(8).toString('hex'),
      colour: newPlayerColour,
    };
    users[newGameId] = [newPlayer];
    socket.emit('gameCreated', {
      gameId: newGameId,
      game: games[newGameId],
      player: newPlayer,
    } as GameCreatedEvent);
  });

  // Join Game
  socket.on('joinGame', (event: JoinGameEvent) => {
    socket.join(event.id);
    console.log('User joined game:', event.id);

    const user: UserInfo = users[event.id][0];
    let newColour: PlayerColour;
    if (user.colour === PlayerColour.dark) {
      newColour = PlayerColour.light;
    } else {
      newColour = PlayerColour.dark;
    }

    const newPlayer = {
      name: event.playerName,
      id: crypto.randomBytes(8).toString('hex'),
      colour: newColour,
    };

    socket.emit('gameJoined', {
      gameId: event.id,
      game: games[event.id],
      player: newPlayer,
      otherPlayers: users[event.id],
    } as GameJoinedEvent);

    socket.to(event.id).emit('playerJoinedGame', {
      player: newPlayer,
    } as PlayerJoinedGameEvent);
  });

  // Move Made
  socket.on('makeMove', (event: MoveEvent) => {
    // TODO: replace testroom
    console.log('Move made:', event);
    games[event.gameId] = event.gameState;
    socket.to(event.gameId).emit('moveMade', event);
  });
});

// Express server listening...
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
