const socket = io();
const txtArea = document.getElementById("textarea");
const messageArea = document.querySelector(".message_area");

let username;
 do {
    username = prompt("Enter your Name: ")
} while (!username)

txtArea.addEventListener("keyup",(e)=>{
    if(e.key === "Enter"){
        let  msg = {
            user :username,
            message:e.target.value.trim()
        }
        e.target.value = "";
        if(msg.message !== ""){
            appendMessage(msg , "outgoing_message")
            scrollToBottom();
            //send message
            socket.emit("message" , msg);
        }
    }
})

function appendMessage(msg , type){

    const today =new Date();
    const hr = today.getHours();
    const min = today.getMinutes();
    const ampm = hr>=12? "pm" : "am";
    const time = hr + ":" + min +" " + ampm;

    let chatDiv = document.createElement("div");
    let className = type;
    chatDiv.classList.add(className , "message");

    let markup = 
    `<h4>${msg.user}</h4>
    <p>${msg.message} <span>${time}</span> </p>
    `

    chatDiv.innerHTML = markup;
    messageArea.appendChild(chatDiv);
}

//recieve message
socket.on("message" , (msg)=>{
    appendMessage(msg , "incoming_message")
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}