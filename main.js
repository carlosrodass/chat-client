const form = document.getElementById('form');


//Permitiendo que el cliente se conecte a socket || Normalmente las peticiones se hacen con AJAX O FETCH
const socket = io('https://chatbackcr.herokuapp.com', { 'forceNew': true });
// const socket = io('http://localhost:3000', { 'forceNew': true });

socket.on('connect', () => {
    console.log('connected to backend');
});


socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

// Add a disconnect listener
socket.on('disconnect', function () {
    console.log('The client has disconnected!');
});

//Pintando los mensajes del servidor en html
function render(data) {
    //Map permite recorrer los datos del objeto
    var html = data.map(function (message, index) {
        return (
            `
            <div class="message">
                <h3>${message.nickname}</h3>
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');


    var divMSG = document.getElementById('mensaje');
    divMSG.innerHTML = html;
    divMSG.scrollTop = divMSG.scrollHeight;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    console.log(message);

    const nick = document.getElementById('nickname')
    const txt = document.getElementById('text');
    const btn = document.getElementById('btn');

    nick.style.display = 'none';
    txt.value = " "

    if (!message.text) {
        btn.setEnable(false);
        alert("Empty message");

    } else {
        socket.emit('add-message', message);
        // return false;
    }
})
