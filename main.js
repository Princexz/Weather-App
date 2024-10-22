const api = {
    key: "82050cb394139bfa5b54521b42f983ea",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search")
const btn = document.querySelector(".btn")

btn.addEventListener("click", getInput)

function getInput(e){
     e.preventDefault()
     if (e.type == "click"){
        getData(search.value)
     }
}

function getData(){
    fetch(`${api.base}weather?q=${search.value}&
    units=metric&appid=${api.key}`)
        .then(response=>{
            return response.json()
        }) .then(displayData)
        // console.log(response)
}

function displayData(response){
    if (response.cod =="200"){
        const city = document.querySelector(".city")
        city.innerText = ` ${response.name}, ${response.sys.country}`

        let today = new Date()
        const date = document.querySelector(".date")
        date.innerText = dateFunction(today)

        const time = document.querySelector(".time")
        time.innerHTML = timeFunction(today)

        const temp = document.querySelector(".temp")
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} 
        <span>&#8451;</span>`

        const weather = document.querySelector(".weather")
        weather.innerText = `Weather: ${response.weather[0].main}`

        const tempRange = document.querySelector(".temp-range")
        tempRange.innerText = `
        Temp Range: ${Math.round(response.main.temp_min)} \u00B0C / 
        ${Math.round(response.main.temp_max)} \u00B0C;
        `
        const weatherIcon = document.querySelector(".weather-icon")
        const iconUrl = "http://openweathermap.org/img/w/"
        weatherIcon.src = iconUrl + response.weather[0].icon + ".png"

        search.value = ""

    } else{
        const error = document.querySelector(".error")
        error.textContent = "Please Enter a valid City"
        search.value = ""

        
    }
    
}

function dateFunction(d){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    

    return `${day}, ${date} ${month} ${year}`
}

function timeFunction(now) {
    let hours = now.getHours().toString().padStart(2, "0")
    let minutes = now.getMinutes().toString().padStart(2, "0")
    let seconds = now.getSeconds().toString().padStart(2, "0")

    let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // If the hour is 0, set it to 12


    return ` ${hours}:${minutes}:${seconds} ${ampm}`
  }

setInterval(timeFunction, 1000);
