const socket = io();

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");

const enterBtn = welcome.querySelector("#welcome form");
//const nameBtn = welcome.querySelector("#nickname");
const msgBtn = room.querySelector("#message");

room.hidden = true;

let roomName, userName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#message input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = welcome.querySelector("#nickname input");
  socket.emit("nickname", input.value);
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  const h4 = room.querySelector("h4");
  h3.innerText = `Room ${roomName}`;
  h4.innerText = `My nickname: ${userName}`;
}

//nickname

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomInput = welcome.querySelector("#enterRoom input");
  const firstNickname = welcome.querySelector("#nickname input");
  userName = firstNickname.value;
  roomName = roomInput.value;

  socket.emit("enter_room", roomName, userName, showRoom);
  roomInput.value = "";
  firstNickname.value = "";
}

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

socket.on("nickname", (newname) => {
  userName = newname;
});

enterBtn.addEventListener("submit", handleRoomSubmit);
msgBtn.addEventListener("submit", handleMessageSubmit);
//nameBtn.addEventListener("submit", handleNicknameSubmit);
