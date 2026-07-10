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
        alert("Username cannot be empty and must be between 3-20 characters!");
        return;
    }

    //the following lines should be moved to the authentication confirmation from the server
    document.getElementById('loginUI').style.display = 'none';
    document.getElementById('chatUI').style.display = '';
}
socket.on("typing", function(data){
    console.log("typing event: "+data);
    $(".ticontainer").show();
    setTimeout(() => {$(".ticontainer").hide()},10000);
    //clear the typing message after 0.5s to make it look realtime,
    //otherwise, it is displayed forever
});