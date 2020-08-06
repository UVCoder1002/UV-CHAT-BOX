const messageTypes = { LEFT: "left", RIGHT: "right", LOGIN: "login" };

//CHAT STUFF

const chatwindow = document.getElementById("chat");
const messageList = document.getElementById("message-list");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatWindow = document.getElementById("chat");

//LOGIN STUFF
let username = "";
let message;
const loginBtn = document.getElementById("loginBtn");
const loginWindow = document.getElementById("login");
const usernameInput = document.getElementById("usernameInput");

const messages = []; //AUTHOR,DATE,CONTENT,TYPE

var socket = io();

socket.on("message", (message) => {
  console.log(message);
  if (message.type !== messageTypes.LOGIN) {
    if (message.author === username) {
      message.type = messageTypes.RIGHT;
    } else {
      message.type = messageTypes.LEFT;
    }
  }

  messages.push(message);
  displayMessages();
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

//TAKE IN MESSAGE AND RETURN MESSAGE HTML

const createMessageHTML = (message) => {
  if (message.type === messageTypes.LOGIN) {
    return `<p class="secondary-text mb-2 text-center">
        ${message.author} joined the chat...
         </p>`;
  }
  return `<div id="${
    message.type === messageTypes.RIGHT ? "message-right" : "message-left"
  }">
                    <div class="message-details flex">
                        <p class="name">${
                          message.type === messageTypes.RIGHT
                            ? " "
                            : message.author
                        }</p>
                        <p class="date">${message.date}</p>
                    </div>
                    <div class="message-content">
                        <p>${message.content}</p>
                    </div>
      </div>`;
};

const displayMessages = () => {
  const messagesHTML = messages
    .map((message) => createMessageHTML(message))
    .join("");
  console.log(messagesHTML);
  messageList.innerHTML = messagesHTML;
};

//LOGINBUTTON
loginBtn.addEventListener("click", (e) => {
  //PREVENTDEFAULT IN FORM
  e.preventDefault();

  //TAKE IN USERNAME AND GET LOGGED IN WINDOW
  if (!usernameInput.value) {
    return console.log("cannot be empty..");
  }
  username = usernameInput.value;
  message = {
    author: username,
    type: messageTypes.LOGIN,
  };
  socket.emit("message", message);
  //HIDE LOGIN PAGE AND SHOW CHAT WINDOW
  loginWindow.classList.add("hidden");
  chatWindow.classList.remove("hidden");
  //SHOW THE MESSAGES
});
//SENDBUTTON
sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const date = new Date();
  const day = date.getDay();
  const month = ("0" + date.getMonth() + 1).slice(-2);
  const year = date.getFullYear();
  const dateString = `${day}/${month}/${year}`;
  if (messageInput.value) {
    message = {
      author: usernameInput.value,
      content: messageInput.value,
      date: dateString,
      type: messageTypes.RIGHT,
    };
    // messages.push(message);
  }
  socket.emit("message", message);
  messageInput.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
