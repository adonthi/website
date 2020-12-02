import React from 'react';
import './Plant.css';
import styled from 'styled-components';
import suncalc from 'suncalc';

enum BackgroundColor {
  Morning = '#73aaee',
  Midday = '#8c83f2',
  Sunset = '#bd711c ',
  Night = '#0c1445',
}

type PlantState = {
  produce: string;
  sunTimes: suncalc.GetTimesResult;
};

class Plant extends React.Component<{}, PlantState> {
  BodyDiv = styled.div`
  background-color: ${Plant.getBackgroundColor()}
  `;

  constructor(props: any) {
    super(props);
    this.state = {
      produce: 'Tomatoes', // TODO - pull current produce
      sunTimes: Plant.getSunTimes(),
    };
  }

  static getSunTimes() {
    let latitude = 35.7796;
    let longitude = -78.6382;
    const now = new Date();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      });
    }
    return suncalc.getTimes(now, latitude, longitude);
  }

  static getBackgroundColor() {
    const sunTimes = Plant.getSunTimes();
    const now = new Date();
    if (now < sunTimes.sunrise) {
      return BackgroundColor.Night;
    } if (now < sunTimes.solarNoon) {
      return BackgroundColor.Morning;
    } if (now < sunTimes.sunsetStart) {
      return BackgroundColor.Midday;
    } if (now < sunTimes.sunset) {
      return BackgroundColor.Sunset;
    }
    return BackgroundColor.Night;
  }

  render() {
    const { produce, sunTimes } = this.state;
    const now = new Date();
    const isDay = now < sunTimes.sunset;
    const isMorning = now < sunTimes.solarNoon && now > sunTimes.sunrise;
    let welcomePhrase: string;
    if (isDay) {
      if (isMorning) {
        welcomePhrase = 'Good morning!';
      } else {
        welcomePhrase = 'Hello!';
      }
    } else {
      welcomePhrase = 'Good evening.';
    }
    return (
      <div>
        <this.BodyDiv className="plant-body container-fluid">
          {isDay ? (
            <div className="sun">
              {['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
                .map((direction) => <div className={`sun-tri ${direction}`} />)}
            </div>
          ) : (
            <div className="moon" />
          )}
          <h1 className="welcome-phrase">{welcomePhrase}</h1>
          <h2 className="produce-phrase">
            {produce}
            {' '}
            are in season.
          </h2>
        </this.BodyDiv>
        <div className="plant-ground" />
      </div>
    );
  }
}

export default Plant;
