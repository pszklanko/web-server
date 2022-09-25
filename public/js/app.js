const fetchWeather = (address) => fetch(`/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            messageOne.textContent = '';
            messageTwo.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.weather_description;
        }
    });
})

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageTwo.textContent = 'Loading...';
    fetchWeather(search.value);
})