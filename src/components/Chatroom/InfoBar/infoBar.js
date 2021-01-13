import React from 'react';

import onlineIcon from '../Icons/onlineIcon.png';
import closeIcon from '../Icons/closeIcon.png';

import './infoBar.css';

export const InfoBar = () => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>History Chat</h3>
    </div>
    {/* <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div> */}
  </div>
);