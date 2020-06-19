//const { response } = require("express");

console.log('Client Side Java script file loaded');

/*fetch('http://puzzle.mead.io/puzzle'). then((response) => {
        response.json().then((data) => {
            console.log(data);
        })
    })*/

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
//const clear = document.querySelector('#clear');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

//messageOne.textContent ='Java Script';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    
    if(location == '') {
        //return console.log('You must enter a location');
        messageTwo.textContent = '';
        return messageOne.textContent = 'You must enter a location!';
    }

    const url = 'http://localhost:3000/weather?address='

    messageOne.textContent ='Loading........';
    messageTwo.textContent = '';

    fetch(url+location).then((response) => {
    response.json().then((data) => {
            if(data.Error) {
                messageOne.textContent = data.Error;
            } else {
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecast;
            }  
        })
    })
})