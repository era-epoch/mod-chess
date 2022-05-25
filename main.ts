import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import 'dotenv/config';
import websockets from './websockets';

const app = express();

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

// Express server listening...
const port = process.env.PORT || 5000;

const httpServer = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

websockets(httpServer);
