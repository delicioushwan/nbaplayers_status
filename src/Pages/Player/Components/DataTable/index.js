import React from 'react';

import { SeasonDataContainer, SeasonDataRow } from './styled';

export default function({ data }) {
  return (
    <SeasonDataContainer>
      {data.map((data, i) => (
        <SeasonDataRow key={i}>
          {data.map((ele, j) => (
            <div key={j}>{ele}</div>
          ))}
        </SeasonDataRow>
      ))}
    </SeasonDataContainer>
  );
}
