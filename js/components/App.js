import React, { Component } 
        from 'react';
import $          from 'jquery';
import { Button } from 'semantic-ui-react'
import 'jquery-ui'

class App extends Component {

state = {
  city:'',
  country:'',
  temperature:'',
  temperatureUnit:'C',
  description:'',
  main:'',
  currentTempInCelsius:'',
  icon:'',
}

componentDidMount = () => {

  let getWeather = (lat, lon) => {
      console.log("getWeather lat = ", lat)
      console.log("getWeather lon = ", lon)
      $.ajax({
        url: "https://fcc-weather-api.glitch.me/api/current?"+ lat + "&" + lon, 
        success: (result) => {
          console.log("result = ", result)
          let currentTempInCelsius = Math.round(result.main.temp * 10) / 10; // celcius formula
          this.setState((prevState, props) => ({
            city: result.name.concat(" City"),
            country: result.sys.country,
            temperature: currentTempInCelsius+" "+ String.fromCharCode(176), // String.fromCharCode(176) is a degree icon
            main: result.weather[0].main,
            icon: result.weather[0].icon,
            description: result.weather[0].description
          }));
          
        }
      });
    }

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
       var lat = "lat=" + position.coords.latitude;
       var lon = "lon=" + position.coords.longitude;
       getWeather(lat, lon);
    });

  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}





  render() {
    return (
        <div> 
          <span className="title"> Reactjs Show the Local Weather </span>
            <div className="container">
              <span style={{fontSize: '20px'}}> {`${this.state.city}, ${this.state.country}`} </span>
              <div> <img style={{width: '100px', height: '100px'}} src={this.state.icon} /> </div>
              <span style={{fontSize: '18px'}}> {`${this.state.main} - ${this.state.description}`}  </span>
              <div style={{marginTop: '40px'}}>
                <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-random-quote.herokuapp.com/"> link </a> </span>
                <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-local-weather"> link </a> </span>
            </div>
            </div>
          <span className="footer"> Developed by Glendon Philipp Baculio </span>
        </div>
    )
  }
}

export default App
