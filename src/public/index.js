const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "Input email address",
    input: "email",
    inputPlaceholder: "Enter your email address",
  }).then((input) => {
    username = input.value;
    socket.emit("newUser", username);
  });
}

const message = document.getElementById("message");
const btnSend = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btnSend.addEventListener("click", () => {
  socket.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = ''
  const chatRender = data
    .map((msg) => {
      return `<p><strong>${msg.username}</strong>: ${msg.message}</p>`;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

socket.on("newUser", (username) => {
  Toastify({
    text: `${username} is logged in`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {},
  }).showToast();
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p>${data} is typing...</p>`;
});
