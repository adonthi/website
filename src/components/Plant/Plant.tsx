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

function getSunTimes(): suncalc.GetTimesResult {
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

function getBackgroundColor() {
  const sunTimes = getSunTimes();
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

const BodyDiv = styled.div`
background-color: ${getBackgroundColor()}
`;

type PlantState = {
  isDay: boolean;
};

class Plant extends React.Component<{}, PlantState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDay: new Date() < getSunTimes().sunset,
    };
  }

  render() {
    const { isDay } = this.state;
    return (
      <BodyDiv className="plant-body">
        <h1>Plant</h1>
        {isDay ? (
          <div className="sun">
            {['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
              .map((direction) => <div className={`sun-tri ${direction}`} />)}
          </div>
        ) : (
          <div className="moon">
            <p>hey im the moon</p>
          </div>
        )}
      </BodyDiv>
    );
  }
}

export default Plant;
