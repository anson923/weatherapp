/*
WEATHER API: https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=986bc7f39c0ed5386e3f0b3005bdb60b
KEY: &APPID=986bc7f39c0ed5386e3f0b3005bdb60b
Search: ?q=
*/

const noResultErrorCode = 404;

const weatherKey = "&APPID=986bc7f39c0ed5386e3f0b3005bdb60b";
const searchLocation = "New York";
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const getWeatherData = async (location) => {
  try{
    setSearchingText();
    lockSearchField();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}${weatherKey}`);
    if(response.ok)
    {
      const data = await response.json();
      setWeatherData(data);
      return data;
    }
    else if(response.status === noResultErrorCode)
    {
      const inputTextField = document.querySelector('#user-input-location');
      inputTextField.classList.add('error'); 
      // remove the class after the animation completes
      setTimeout(function() {
        inputTextField.classList.remove('error');
      }, 300);
      throw "No such city.";
    }
    else
    {
      throw "Unexpected error!"
    }
  }
  catch(e)
  {
    console.error(e);
  }
  finally
  {
    unlockSearchField();
  }
}

function setSearchingText()
{
  const location = document.querySelector('.location');
  location.innerText = 'Searching';

  const date = document.querySelector('.date');
  date.innerText = 'Searching';

  const temperature = document.querySelector('.temperature');
  temperature.innerText = 'Searching';

  const low_temp = document.querySelector('.low-temp');
  const high_temp = document.querySelector('.high-temp');

  low_temp.innerText = 'Searching';
  high_temp.innerText = 'Searching';
}

function lockSearchField()
{
  const searchField = document.querySelector('#user-input-location');
  searchField.disabled = true;
}

function unlockSearchField()
{
  const searchField = document.querySelector('#user-input-location');
  searchField.disabled = false;
}

function setWeatherData(data)
{
  const location = document.querySelector('.location');
  location.innerText = `${data.name}, ${data.sys.country}`;

  const today = new Date();
  const date = document.querySelector('.date');
  date.innerText = `${weekday[today.getDay()]} ${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}`;

  const temperature = document.querySelector('.temperature');
  temperature.innerText = `${getCelciusFromKelvin(data.main.temp)} \u2103`;

  const low_temp = document.querySelector('.low-temp');
  const high_temp = document.querySelector('.high-temp');

  low_temp.innerText = `${getCelciusFromKelvin(data.main.temp_min)} \u2103`;
  high_temp.innerText = `${getCelciusFromKelvin(data.main.temp_max)} \u2103`;

}

function getCelciusFromKelvin(K)
{
  return Math.round(K - 273.15);
}

function searchBarHandle(event)
{
  if(event.keyCode === 13)
  {
    const target = event.target;
    getWeatherData(target.value);
  }

}

getWeatherData(searchLocation);