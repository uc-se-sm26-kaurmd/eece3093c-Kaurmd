// =============================================================================
// EECE/CS 3093C Software Engineering — Lab 1
// server.js — code skeleton provided by Phu Phung
// complete implementation by Manjinder Kaur
// =============================================================================
const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const path       = require('path');
const app    = express();
const server = http.createServer(app);
const io     = new Server(server);
// AC-02.6 (Security): CSP header - browser-level defense-in-depth
/*app.use((req, res, next) => {
  res.setHeader(
  'Content-Security-Policy',
  "default-src 'self'; \
  "script-src 'self' https://cdnjs.cloudflare.com; https://cdn.jsdelivr.net; https://code.jquery.com; \
  "style-src 'self' 'unsafe-inline; \
  "connect-src 'self' https://cdnjs.cloudflare.com; https://cdn.jsdelivr.net; https://cdn.jsdelivr.net/npm; https://code.jquery.com;"
);
  next();
});*/
app.use(express.static(path.join(__dirname, 'ui')));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('Server running on port ' + PORT));

// In-memory store: socketId → username
const userlist = new Map();

// =============================================================
// Use-Case-03: Join Chat — credential store (internal to Use-Case-03, not part of Use-Case-04)
// Temporary: hard-coded JSON array — Lab 2 only
// TODO (Sprint 2): replace with MongoDB Atlas + bcrypt hashing
// =============================================================
const users = [
  { username: 'abc',   password: 'Pass1234' },
  { username: 'xyz',     password: 'Pass5678' },
  { username: 'test', password: 'Pass9012' }
];  

// =============================================================
// Use-Case-04: Authorize User
// returns true if this connection was authenticated by Use-Case-03
// =============================================================
function authorizeUser(socket) {
  if (!socket || !socket.authenticated) 
    console.log('Connection has not been authenticated');
  return socket.authenticated === true;  
}
// =============================================================
// Helper: send an event only to authenticated connections
// Used by Use-Case-01 (Send Message) and Use-Case-03 (Join Chat)
// =============================================================
function sendToAuthenticatedClients(event, data) {
  userlist.forEach((_, sid) => {
    const s = io.sockets.sockets.get(sid);
    if (s && authorizeUser(s)) s.emit(event, data);
  });
}

io.on('connection', (socket) => {

  // Auto-assign a unique username from the socket ID
  //const username = 'User_' + socket.id.slice(-5);
  //userlist.set(socket.id, username);

  // UC-04 result: authentication state per connection
  socket.authenticated = false; // AC-04
  console.log('New client connected - socket ID: ' + socket.id )

  //Todo: UC-02 (AC-02.1): notify all connected clients that a new user joined
  //io.emit('status', username +
       // ' joined the chat. Number of connected clients: ' + userlist.size);

  // =======================================
  // Use-Case-03: Join Chat
  // =======================================
  socket.on('join', function ({ username, password }) {
    // AC-03.2: server-side structural validation
    if (!username || typeof username !== 'string' ||
        !password || typeof password !== 'string' ||
        username.trim().length === 0 || 
        password.length === 0) {
      socket.emit('join-error', 'Invalid request.'); // AC-03.4
      return;
    }
    username = username.trim();
    console.log(`Debug>UC-03: Join Chat, server received username '${username}' and password '${password}'`);
    // AC-03.3: credential lookup - same result for unknown user or wrong password
    const user = users.find(u =>
      u.username === username && u.password === password
    );
    if (!user) {
      // AC-03.3: generic message - does not reveal which field failed
      socket.emit('join-error', 'Invalid username or password.'); // AC-03.4
      console.log(`Debug>UC-03: Join Chat - invalid username '${username}' or password '${password}'`);
      
      return;
    }

    //AC-03.5: mark connection as authenticated before any further response
    socket.authenticated = true;
    userlist.set(socket.id, username);

    socket.emit('join-success', username); // AC-03.6
    // AC-03.7: broadcast updated user list to authenticated connections only
    sendToAuthenticatedClients('status', username + ' joined the chat. Number of connected clients: ' + userlist.size);
    const authenticatedUsers = Array.from(new Set(userlist.values()));
    sendToAuthenticatedClients('user-list', authenticatedUsers); // AC-03.7
    console.log('UC-03 user joined -', username,
                '| authenticated connections:', userlist.size);
  });

  // ---------------------------------------------------------------------------
  // Use-Case-01: Send message
  //
  // AC-01.1: a username is always assigned on connection — every sender
  //          is identified before any message can be sent
  // AC-01.2: empty or non-string messages are ignored — no broadcast is sent
  // AC-01.3: the message is broadcast to ALL connected clients
  // AC-01.4: the broadcast payload includes the sender's username and the text
  // AC-01.5: input is cleared after sending (enforced client-side)
  // ---------------------------------------------------------------------------
  //Todo: code to implement the above use case and AC items
  socket.on('message', (data) => {
    console.log(`Debug> received a chat message: ${data}`); //new debug for Lab 2 security check
    // «include» UC-04: Authorize User //new for Lab 2
    if (!authorizeUser(socket)) {
      socket.emit('not-authorized');
      return;
    }
    // AC-01.2: ignore empty messages
    if (!data || data.trim() === '') return;
    // AC-01.3 + AC-01.4: revised: broadcast to all authenticated clients with sender username
    const sender = userlist.get(socket.id);
    console.log(`Debug> "${sender}" sent: ${data}`);
    //io.emit('message', sender + ' says: ' + data.trim()); //old code in Lab 1 sent to all connected clients
    sendToAuthenticatedClients('message', sender + ' says: ' + data.trim()); // new code for Lab 2
  });

  // ---------------------------------------------------------------------------
  // Use-Case-02: Receive message — disconnect notification
  //
  // AC-02.2: all connected clients are notified when a user leaves
  // ---------------------------------------------------------------------------
  socket.on('disconnect', () => {
    if (!authorizeUser(socket)) {
      socket.emit('not-authorized');
      return;
    }
    const username = userlist.get(socket.id);
    userlist.delete(socket.id);
    console.log('Client disconnected - socket ID: ' + socket.id);
    //todo: code to broadcast the status
    //io.emit('status', username +
    //  ' left the chat. Number of connected clients: ' + userlist.size);
    sendToAuthenticatedClients('status', username + ' left the chat. Number of connected clients: ' + userlist.size);
    // AC-03.7: broadcast updated user list to authenticated connections only
    const authenticatedUsers = [...new Set(userlist.values())];
    sendToAuthenticatedClients('user-list', authenticatedUsers); // AC-03.7
  });
  socket.on('typing', () => {
    console.log(`Debug> received a typing event`); //new debug for Lab 2 security check
    // <<include>> UC-04: Authorize User //new for Lab 2
    if (!authorizeUser(socket)) {
      socket.emit('not-authorized');
      return;
    }
    const username = userlist.get(socket.id);
    console.log(`${username} is typing ...`)
    socket.broadcast.emit('typing', username);
  });

});
