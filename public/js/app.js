console.log('client side js loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message_one');
const messageTwo = document.querySelector('#message_two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetchWeather(location);
})

const fetchWeather = (address) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const url = `http://localhost:3000/weather?address=${address}`;
    fetch(url).then(res => {
        res.json().then(data => {
            console.log(data);
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        })
    })
}