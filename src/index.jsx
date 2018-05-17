/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GeoLocation from 'react-geolocation'
import './assets/stylesheets/style.css'

const API = 'https://weatherapp.eficode.fi/api/forecast?'
const IMAGE_PATH_BEGIN = 'https://weatherapp.eficode.fi/img/'
const IMAGE_PATH_END = '.svg'

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weather: [],
      lon: '24.9247536',
      lat: '60.1698509',
      error: null
      
    };
  }
  componentDidMount() {
    this.updateWeather()
  }

  updateWeather = () => {
      
    const success = (position) => {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      console.log(latitude)
      console.log(longitude)

      const formQuery = () => 'lat='+latitude+'&lon='+longitude
    
      fetch(API + formQuery())
        .then(response => response.json())
        .then(data => this.setState({ 
          weather: data,
          lon: longitude,
          lat: latitude,
          error: null,
          })
        )
    }

    const error = () => {
        this.setState({
          error: "Unable to retrieve your location..."
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 3000)
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }

  render() {

    const selectDescription = () => {
      return (
        this.state.weather.description==null ? 
        <p>Fetching weather...</p>:
        <p>There is {this.state.weather.description}.</p>
      )  
    }
    
    return (
      <div>
        <Error message={this.state.error} />
        <h2>Current weather</h2>
        <img 
          src={IMAGE_PATH_BEGIN+this.state.weather.icon+IMAGE_PATH_END}
          alt={'Weather image'}/>
        {selectDescription()}
        <p><button onClick={this.updateWeather}>Update</button></p>

      </div> 
    )
  }
}
export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
