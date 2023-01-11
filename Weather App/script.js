/* eslint-disable no-undef */
const wrapper = document.querySelector('.wrapper')
const inputPart = wrapper.querySelector('.input-part')
const infoTxt = wrapper.querySelector('.info-txt')
const inputField = inputPart.querySelector('input')
const locationBtn = inputPart.querySelector('button')
wIcon = document.querySelector('.weather-part img')
arrowBack = wrapper.querySelector('header i')
let api
// eslint-disable-next-line no-undef
apiKey = ''

inputField.addEventListener('keyup', (e) => {
  // User presses enter button and input value isn't empty
  // eslint-disable-next-line eqeqeq
  if (e.key == 'Enter' && inputField.value != '') {
    requestApi(inputField.value)
  }
})

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) { // if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    alert("Your browser doesn't support geolocation api")
  }
})
function onSuccess (position) {
  const { latitude, longitude } = position.coords // getting latitude and longitude of the user device from coords object
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  fetchData()
}
function onError (error) {
  infoTxt.innerText = error.message
  infoTxt.classList.add('error')
}
function requestApi (city) {
  // eslint-disable-next-line no-undef
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  fetchData()
}
function fetchData () {
  infoTxt.innerText = 'Getting weather details...'
  infoTxt.classList.add('pending')
  //   // The fetch() method returns a promise that resolves to a Response object.
  //   // The response.json() method is used to parse the JSON data from the API.
  //   // The final result is passed as an argument to the function weatherDetails to take further actions on it.
  fetch(api).then((response) => response.json()).then((result) => weatherDetails(result))
}

function weatherDetails (info) {
  // eslint-disable-next-line eqeqeq
  if (info.cod == '404') {
    infoTxt.innerText = `${inputField.value} isn\'t a valid city name`
    infoTxt.classList.replace('pending', 'error')
  } else {
    // getting required properties' value from the info object
    const city = info.name
    const country = info.sys.country
    const { description, id } = info.weather[0]
    // eslint-disable-next-line camelcase
    const { feels_like, humidity, temp } = info.main

    // eslint-disable-next-line eqeqeq
    // Used custom icon according to the id which api returns
    if (id == 800) {
      wIcon.src = 'Weather Icons/clear.svg'
    } else if (id >= 200 && id <= 232) {
      wIcon.src = 'Weather Icons/storm.svg'
    } else if (id >= 300 && id <= 321) {
      wIcon.src = 'Weather Icons/rain.svg'
    } else if (id >= 600 && id <= 622) {
      wIcon.src = 'Weather Icons/snow.svg'
    } else if (id >= 701 && id <= 781) {
      wIcon.src = 'Weather Icons/haze.svg'
    } else if (id >= 801 && id <= 804) {
      wIcon.src = 'Weather Icons/cloud.svg'
    }

    // passing values to a particular html element
    wrapper.querySelector('.temp .numb').innerText = Math.floor(temp)
    wrapper.querySelector('.weather').innerText = description
    wrapper.querySelector('.location span').innerText = `${city},${country}`
    // eslint-disable-next-line camelcase
    wrapper.querySelector('.temp .numb-2').innerText = Math.floor(temp)
    wrapper.querySelector('.humidity span').innerText = `${humidity}%`
    infoTxt.classList.remove('pending', 'error')
    wrapper.classList.add('active')
    console.log(info)
  }
}

arrowBack.addEventListener('click', () => {
  wrapper.classList.remove('active')
})
