//Create an array where the message along with it's ID will be stored.
let message = [];

const list = document.querySelector('.messages');

for(let i = 1; i <= localStorage.length; i++){
        message.push(localStorage[i]);
        console.log(localStorage[i]);
        list.insertAdjacentHTML('beforeend',
            `<b class="message-item" data-key="${localStorage[i]}">
            <span>${localStorage[i]}</span>
        </b>`
        );
}

// This function will enables us to add the message to the DOM
function addMessage(text){
    //Object where message will be stored
    const chat = {
        text,
        id: Date.now()
    }

    if (message.length === 11)
    {
        message = [];
        list.innerHTML = "";
        localStorage.clear();
    }
    message.push(chat);
    localStorage.setItem(message.length.toString(), text);
    console.log(message);

    //Render message to the screen
    list.insertAdjacentHTML('beforeend',
        `<p class="message-item" data-key="${chat.id}">
            <span>${chat.text}</span>
        </p>`

    );

}

//Create event listener to detect when a message has been submitted
const form = document.querySelector('.message-form');
form.addEventListener('submit', event => {
    event.preventDefault();

    //input to save the message itself
    const input = document.querySelector('.typedMessage');

    //This helps us to detect empty messages and ignore them
    const text = input.value.trim();

    if(text !== ''){
        addMessage(text);
        input.value = '';
        input.focus();

    }
});
