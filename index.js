// API: https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=986bc7f39c0ed5386e3f0b3005bdb60b
//KEY: &APPID=986bc7f39c0ed5386e3f0b3005bdb60b
//Search: ?q=

const key = "&APPID=986bc7f39c0ed5386e3f0b3005bdb60b";
const searchLocation = "Vancouver";


const getWeatherData = async (location) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}${key}`);
  if(response.ok)
  {
    const data = await response.json();
    console.log(data);
    return data;
  }
  else
  {
    console.log('Somethime wrong', response);
  }
}

console.log("hello world!");