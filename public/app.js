const messageTypes = { LEFT: "left", RIGHT: "right", LOGIN: login };

//CHAT STUFF

const chatwindow = document.getElementById("chat");
const messageList = document.getElementById("message-list");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatWindow = document.getElementById("chat");

//LOGIN STUFF
let username = "";
const loginBtn = document.getElementById("loginBtn");
const loginWindow = document.getElementById("login");
const usernameInput = document.getElementById("usernameInput");

const messages = []; //AUTHOR,DATE,CONTENT,TYPE

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
  messages.push({
    author: username,
    type: messageTypes.LOGIN,
  });
  //HIDE LOGIN PAGE AND SHOW CHAT WINDOW
  loginWindow.classList.add("hidden");
  chatWindow.classList.remove("hidden");
  //SHOW THE MESSAGES
  displayMessages();
});
//SENDBUTTON
sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (messageInput.value) {
    messages.push({
      author: usernameInput.value,
      content: messageInput.value,
      date: new Date(),
      type: messageTypes.RIGHT,
    });
  }
  displayMessages();
  messageInput.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
