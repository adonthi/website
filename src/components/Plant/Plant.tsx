import React, { useState } from 'react';
import './Plant.css';
import styled from 'styled-components';
import suncalc from 'suncalc';
import { Button } from 'react-bootstrap';
// import gsap from 'gsap';
// import { FallingAnimation } from '../Physics/Animation';

enum BackgroundColor {
  Morning = '#73aaee',
  Midday = '#8c83f2',
  Sunset = '#bd711c ',
  Night = '#0c1445',
}

// const item = useRef(null);

function getSunTimes() {
  let latitude = 35.7796;
  let longitude = -78.6382;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
  }
  return suncalc.getTimes(new Date(), latitude, longitude);
}
const sunTimes = getSunTimes();
function getBackgroundColor() {
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
const BodyDiv = styled.div`
background-color: ${getBackgroundColor()}
`;
// useEffect() {
//   const t1 = gsap.timeline();
//   t1.add(FallingAnimation(item), 1);
// }
function Plant() {
  // eslint-disable-next-line
  const [produce, setProduce] = useState('Tomatoes');
  const now = new Date();
  const isDay = now < sunTimes.sunset && now > sunTimes.sunrise;
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
      <BodyDiv className="plant-body container-fluid">
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
        <Button className="produce-button" variant="light" onClick={() => setProduce('Grapes')}>What else?</Button>
      </BodyDiv>
      <div className="plant-ground" />
    </div>
  );
}

export default Plant;
