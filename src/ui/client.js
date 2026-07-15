/* =============================================================================
 * EECE/CS 3093C Software Engineering — Lab 1
 * client.js — code skeleton provided by Dr. Phu Phung
 * Code complete implementation by Manjinder Kaur
 * ===============================================================================
 */
var socket = io(); //connect to the Socket.io Server
socket.on("connect", () => { //connected to the server
  console.log(`Connected to Socket.io server: 
    ${socket.io.opts.hostname}, port: ${socket.io.opts.port}`);
});

/**
 * code blocks below have been implemented in Lecture 8
 */
// UI DOM references
var sendBtnElm = document.getElementById('send-button');
if(!sendBtnElm) {
    console.log("Error in getting 'send-button' button");
}
// AC-01.2 (UI): Send button click triggers sendMessage()
sendBtnElm.addEventListener('click', sendMessage);

var chatMessageInput = document.getElementById('chat-message');
if(!chatMessageInput) {
    console.log('Error in getting "chat-message" input');
}
// AC-01.2 (UI): pressing Enter also triggers sendMessage()
chatMessageInput.addEventListener('keypress', function(e) {
    socket.emit('typing');
    if (e.key === 'Enter') sendMessage();
});

// =============================================================================
// Use-Case-01: Send Message
// =============================================================================

function sendMessage() {
    var message = chatMessageInput.value.trim();
    if (!message) return;   // AC-02.2: empty messages are ignored
    console.log(`Debug>Chat message: ${message}`); //for UI testing only
    socket.emit('message', message); //new code to implement AC-01.3:
    //when a non-empty message is sent
    chatMessageInput.value = ''; // AC-01.5: clear input after sending
    chatMessageInput.focus();
}

// =============================================================================
// Use-Case-02: Receive message 
// =============================================================================

//TODO: code to implement AC-02.1: display incoming chat messages without page refresh
socket.on('message', displayMessage);

function displayMessage(data) {
    var d = document.createElement('div');
    // AC-02.2: shows timestamp for each message
    var timestamp = new Date().toLocaleTimeString();
    d.innerHTML = '<span style="color: #2431e5">[' + timestamp + ']</span> ' 
                    + DOMPurify.sanitize(data);
    document.getElementById('responses').appendChild(d);
}

//TODO: code to implement AC-02.1: display system status events (join/leave) in the status area
// AC-02.1: display system status events (join/leave) in the status area
socket.on('status', function(data) {
    var statusElm = document.getElementById('status');
    // AC-02.2: shows timestamp for each message
    var timestamp = new Date().toLocaleTimeString();
    statusElm.innerHTML = statusElm.innerHTML + '<br><span style="color: #2ee524">[' + timestamp + ']</span> ' + DOMPurify.sanitize(data);

    // AC-02.3 (UI): auto-scroll to the latest message
    statusElm.scrollTop = statusElm.scrollHeight;
    });

document.getElementById('joinBtn').addEventListener('click', joinChat);
function joinChat() {
    //input validation here before sending to the server
    const username = document.getElementById('username').value;
    const pattern = /^\w{3,20}$/;
    if (!username || !pattern.test(username)) {
        document.getElementById('login-error').textContent="Username cannot be empty and must be between 3-20 characters.";
        return;
    }

    const password = document.getElementById('password').value;
    const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!password || !passwordpattern.test(password)) {
        document.getElementById('login-error').textContent="Password must be at least 6 characters long and contain at least one letter and one number.";
        return;
    }
    document.getElementById('login-error').textContent="";
    // AC-03.1: send credentials (as JSON object) to server (UC-03)
    const logincredentials= { username: username, password: password };
    socket.emit('join', logincredentials);
    //console.log("Debug>sent login credentials to server: " + JSON.stringify(logincredentials));

}   
socket.on('join-success', function(username) {
    //the following lines should be moved to the authentication confirmation from the server
    document.getElementById('loginUI').style.display = 'none';
    document.getElementById('chatUI').style.display = '';

    document.getElementById('display-name').textContent = username;
});

socket.on('join-error', function(message) {
    document.getElementById('login-error').textContent = message;
});

socket.on('not-authorized', function() {
    console.log("Debug>this client has not been authenticated!");
});
socket.on('user-list', (users) => {
    console.log("Debug>got user-list= " + JSON.stringify(users));
    document.getElementById('user-list').textContent = JSON.stringify(users);
});

socket.on("typing", function(data){
    console.log("typing event: "+data);
    $(".ticontainer").show();
    setTimeout(() => {$(".ticontainer").hide()},10000);
    //clear the typing message after 0.5s to make it look realtime,
    //otherwise, it is displayed forever
});

    //Use-Case-05: Register Account:
    document.getElementById('registerBtn').addEventListener('click', registerAccount);

function registerAccount() {
    // AC-05.2: client-side format validation before submission
    const username = document.getElementById('reg-username').value;
    const pattern = /^\w{3,20}$/;
    if (!username || !pattern.test(username)) {
        document.getElementById('register-error').textContent =
          "Username cannot be empty and must be between 3-20 characters!";
        return;
    }
    const password = document.getElementById('reg-password').value;
    const passwordpattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!password || !passwordpattern.test(password)) {
        document.getElementById('register-error').textContent =
            "Password must be at least 6 characters long and contain both letters and numbers.";
        return;
    }
    document.getElementById('register-error').textContent = '';
    socket.emit('register', { username: username, password: password });
}

// AC-05.7: clear confirmation on success, shown on the now-visible login screen
socket.on('register-success', function(username) {
    document.getElementById('registerUI').style.display = 'none';
    document.getElementById('loginUI').style.display = '';
    document.getElementById('register-error').textContent = '';
    document.getElementById('login-error').textContent = `Account '${username}' created! You can now log in.`;
});
// AC-05.8: specific, actionable error message on failure
socket.on('register-error', function(message) {
    document.getElementById('register-error').textContent = message;
});

// Toggle: Login -> Register
document.getElementById('showRegisterBtn').addEventListener('click', function() {
    document.getElementById('loginUI').style.display = 'none';
    document.getElementById('registerUI').style.display = '';
    document.getElementById('login-error').textContent = '';
    });
    // Toggle: Register -> Login
    document.getElementById('showLoginBtn').addEventListener('click', () => {
    document.getElementById('registerUI').style.display = 'none';
    document.getElementById('loginUI').style.display = '';
    document.getElementById('register-error').textContent = '';
    });

// Use-Case-06: Leave Chat
document.getElementById('logoutBtn').addEventListener('click', leaveChat);

function leaveChat() {
    socket.emit('leave-chat');
}

// AC-06.5: return to login screen, clear chat history
socket.on('leave-success', function() {
    document.getElementById('chatUI').style.display = 'none';
    document.getElementById('loginUI').style.display = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('responses') .innerHTML = '';
    document.getElementById('status').innerHTML = '';
});