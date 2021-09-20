const wsUrl = "wss://echo.websocket.org/"

const output = document.querySelector(".data-output-wrapper");
const btnSend = document.querySelector('.msg-send');
const btnGeo = document.querySelector('.get-geo');
const inputText = document.querySelector('.data-entry__input');

let websocket;

function send(){
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function(evt) {
         const message = inputText.value;
         if(message !== "" && message.trim() !== "") {
             writeToScreenMsg(message,'my-msg');
             websocket.send(message)
         }else{
             alert("Значение не должно быть пустым")
         }
    };
    websocket.onmessage = function(evt) {
        writeToScreenMsg(evt.data,'resp-msg');
    };
};

function geo(){
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function(evt){
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let link = document.createElement("a");
            link.classList.add('my-geo');
            link.innerHTML = 'Гео-локация'
            link.href =`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`
            link.target="_blank"
            output.appendChild(link);
            websocket.send(`https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`)
        });
    }}

};

function writeToScreenMsg(message,clsName) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.classList.add(clsName);
    pre.innerHTML = message;
    output.appendChild(pre);
}