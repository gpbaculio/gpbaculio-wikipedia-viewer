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
  currentTempInFarenheit:'',
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
          let currentTempInCelsius   = Math.round(result.main.temp * 10) / 10; // celcius formula
          let currentTempInFarenheit = Math.round(parseInt(result.main.temp) * 9/5 + 32); // convert celcius to farenheit (formula)
          this.setState((prevState, props) => ({
            city: result.name.concat(" City"),
            country: result.sys.country,
            currentTempInCelsius: currentTempInCelsius+" "+ String.fromCharCode(176), // String.fromCharCode(176) is a degree icon
            currentTempInFarenheit: currentTempInFarenheit+" "+ String.fromCharCode(176),
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

  _handleTempUnitClick = (unit) => {
    this.setState((prevState) => ({
      temperatureUnit: Boolean(unit === 'C') ? 'F' : 'C',
    }));
  }

  render() {
    return (
        <div> 
          <span className="title"> Reactjs Show the Local Weather </span>
            <div className="container">
              <span style={{fontSize: '20px'}}> {`${this.state.city}, ${this.state.country}`} </span>
              <div style={{fontSize: '20px', marginTop:'10px'}}> {Boolean(this.state.temperatureUnit === 'C') ? this.state.currentTempInCelsius : this.state.currentTempInFarenheit} <span style={{cursor: 'pointer'}} className="tempUnit" onClick={() => this._handleTempUnitClick(this.state.temperatureUnit)}> {this.state.temperatureUnit} </span></div>
              <div> <img style={{width: '100px', height: '100px'}} src={this.state.icon} /> </div>
              <span style={{fontSize: '18px'}}> {`${this.state.main} - ${this.state.description}`}  </span>
              <div style={{marginTop: '40px'}}>
                <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-local-weather.herokuapp.com/"> link </a> </span>
                <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-local-weather"> link </a> </span>
            </div>
            </div>
          <span className="footer"> Developed by Glendon Philipp Baculio </span>
        </div>
    )
  }
}

export default App
