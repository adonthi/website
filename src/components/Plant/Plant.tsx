import React from 'react';
import './Plant.css';
import styled from 'styled-components';
import suncalc from 'suncalc';

enum BackgroundColor {
  Sunrise = '#ffca7c',
  Morning = '#d7e8fd',
  Midday = '#87ceeb',
  Sunset = '#ffc922',
  Night = '#0c1445',
}

type PlantState = {
  sunTimes: suncalc.GetTimesResult;
};

class Plant extends React.Component<{}, PlantState> {
  BodyDiv = styled.div`
  background-color: ${Plant.getBackgroundColor()}
  `;

  constructor(props: any) {
    super(props);
    this.state = {
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
    } if (now < sunTimes.sunriseEnd) {
      return BackgroundColor.Sunrise;
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
    const { sunTimes } = this.state;
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
      <this.BodyDiv className="plant-body">
        <h1>Plant</h1>
        {isDay ? (
          <div className="sun">
            {['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
              .map((direction) => <div className={`sun-tri ${direction}`} />)}
          </div>
        ) : (
          <div className="moon" />
        )}
        <h2 className="welcome-phrase">{welcomePhrase}</h2>
      </this.BodyDiv>
    );
  }
}

export default Plant;
