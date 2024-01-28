let finalResponse ;


function searching(){

  let searchInput = document.getElementById('searchInput')



searchInput.addEventListener('keydown' ,function(){
  let  searchInputValue = searchInput.value

    getData(searchInputValue)
})


}

async function getData(location='cairo'){


    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4527c041e90f433182413020241501&q=${location}&days=3`)

      finalResponse = await response.json()

      diplayData()

    

}

function diplayData(){





  // TODAY FORECAST
  let cityName = finalResponse.location.name

  let todayTempreture = finalResponse.current.temp_c

  let timing = finalResponse.current.condition.icon

  let todayCondition = finalResponse.current.condition.text






  // TOMORROW FORECAST
  let tomorrowStatus = finalResponse.forecast.forecastday[1].day.condition.icon

  let tomorrowMaxTempreture = finalResponse.forecast.forecastday[1].day.maxtemp_c

  let tomorrowMinTempreture = finalResponse.forecast.forecastday[1].day.mintemp_c

  let tomorrowCondition = finalResponse.forecast.forecastday[1].day.condition.text






  // DAY AFTER TOMORROW FORECAST
  let dayAftertomorrowStatus = finalResponse.forecast.forecastday[2].day.condition.icon

  let dayAftertomorrowMaxTempreture = finalResponse.forecast.forecastday[2].day.maxtemp_c

  let dayAftertomorrowMinTempreture = finalResponse.forecast.forecastday[2].day.mintemp_c

  let dayAftertomorrowCondition = finalResponse.forecast.forecastday[2].day.condition.text





  let week = ['Sunday' , 'Monday' , 'Tuesday'  , 'Wedenday'  ,  'Thursday' , 'Friday' , 'Saturday']
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December']




  // Get Current day
  let dayOne = new Date(finalResponse.forecast.forecastday[0].date)
  let dayOneIndex = dayOne.getDay()
  let todayDate = week[dayOneIndex]




  // Get month day number and month
  let todayNumber = new Date(finalResponse.forecast.forecastday[0].date).getDate()       
  let monthNumber = new Date(finalResponse.forecast.forecastday[0].date).getMonth()
  let  month = months[monthNumber]
  




  // Get Tomorrow day
  let dayTwo = new Date(finalResponse.forecast.forecastday[1].date)
  let dayTwoIndex = dayTwo.getDay()
  let tomorrowDate =week[dayTwoIndex]
  


  // Get day after tomorrow
  let dayThree = new Date(finalResponse.forecast.forecastday[2].date)
  let dayThreeIndex = dayThree.getDay()
  let dayAfterTomorrowDate = week[dayThreeIndex]
  


  document.getElementById('myForecast').innerHTML =` <div class="day col-md-4 ">

  <div class="today">


    <div class="day-head position-relative p-2">
      <h5 class="fs-6">${todayDate}</h5>
      <h5 class="today-date fs-6">${todayNumber+month}</h5>
    </div>


    <div class="day-body p-2">

      <h5 class="text-white">${cityName}</h5>
      <h1 class="temp-deg">${todayTempreture}°C</h1>
      <div class="day-timing-icon"><img src="https:${timing}" alt=""></div>
      <h6 class="text-primary my-1">${todayCondition}</h6>

      <div class="weather-status-icons text-white  my-3 ">
        <span class="me-2 "><img src="images/icon-umberella.png" alt=""> 20%</span>
        <span class="me-2"><img src="images/icon-wind.png" alt="">18km/h</span>
        <span><img src="images/icon-compass.png" alt=""> East</span>
      </div>


    </div>
  </div>
</div>
<div class="day col-md-4 ">

  <div class="tomorrow">


    <div class="day-head p-2">
      <h5 class="text-center fs-6">${tomorrowDate}</h5>
      
    </div>


    <div class="day-body p-2 text-center ">

      <div class="tomorrow-icon my-5">
        <img src="https:${tomorrowStatus}" alt="">
      </div>

      <div class="tomorrow-temp">
        <h4 class="text-white">${tomorrowMaxTempreture}°C</h4>
        <p>${tomorrowMinTempreture}°</p>

      </div>
      <span class="text-primary my-4 d-block">${tomorrowCondition}</span>
    </div>
  </div>
</div>
<div class="day col-md-4 ">

  <div class="day-after-tomorrow">


    <div class="day-head p-2">
      <h5 class="text-center fs-6">${dayAfterTomorrowDate}</h5>
      
    </div>


    <div class="day-body p-2 text-center ">

      <div class="tomorrow-icon my-5">
        <img src="https:${dayAftertomorrowStatus}" alt="">
      </div>

      <div class="tomorrow-temp">
        <h4 class="text-white">${dayAftertomorrowMaxTempreture}°C</h4>
        <p>${dayAftertomorrowMinTempreture}°</p>

      </div>
      <span class="text-primary my-4 d-block">${dayAftertomorrowCondition}</span>
    </div>
  </div>
</div>
`

}




//  تحديد الموقع الخاص باليوزر
function success(position) {
  let currentLocation = `${position.coords.latitude},${position.coords.longitude}`
  getData(currentLocation)
}

function error(){
  getData()
}

window.addEventListener("load", function () {
  navigator.geolocation.getCurrentPosition(success,error);
}
)





searching()







