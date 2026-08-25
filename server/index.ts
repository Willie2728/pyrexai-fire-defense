import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { createApp } from './app';

const port = Number(process.env.PORT || 4311);
const server = createServer(createApp());
const sockets = new WebSocketServer({ server, path: '/ws' });

sockets.on('connection', (socket) => {
  socket.send(JSON.stringify({ type: 'connected', mode: 'simulation', timestamp: new Date().toISOString() }));
});

const telemetryTimer = setInterval(() => {
  const payload = JSON.stringify({
    type: 'telemetry', simulated: true, timestamp: new Date().toISOString(),
    data: { regionalRisk: 72, humidity: 16, windMph: Number((23 + Math.sin(Date.now() / 2000)).toFixed(1)), nodesOnline: 96842 },
  });
  sockets.clients.forEach((client) => { if (client.readyState === client.OPEN) client.send(payload); });
}, 2000);

server.listen(port, process.env.HOST || '0.0.0.0', () => console.log(`PYREXAI API listening on port ${port} (simulation mode)`));

function shutdown() { clearInterval(telemetryTimer); sockets.close(); server.close(() => process.exit(0)); }
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
