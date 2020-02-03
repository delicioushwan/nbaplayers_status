import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import pic1 from '../../pics/nba-we-love-this-game.jpg';
import pic2 from '../../pics/wallpaper.jpg';

export default function() {
  const random = Math.floor(Math.random() * 2);
  const arr = [pic1, pic2];
  const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
    }
`;

  console.log(window.innerHeight, window.innerWidth);
  return (
    <>
      <GlobalStyle />
      <div
        style={{
          height: `${window.innerHeight}px`,
          width: `${window.innerWidth}px`,
          backgroundImage: `url(${arr[random]})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
    </>
  );
}
