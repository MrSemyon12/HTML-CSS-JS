let start = document.querySelector('.start');
let time = document.querySelector('.timer');
let sec = 9;
start.addEventListener('click', main);

function main() {
    sec = 9;
    let promise = new Promise((resolve, reject) => {
        let timer = setInterval(() => {
            time.innerText = '00:0' + sec;
            sec--;
            if (sec < 0) {
                sec = 0;
                time.innerText = '00:0' + sec;
                clearInterval(timer);
                resolve(1);
            }
        }, 1000);

    });
    promise.then((successMessage) => {
        console.log(successMessage);
    });
}