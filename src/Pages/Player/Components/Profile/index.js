import React from 'react';

import { Profile, Photo, Detail, Row, SummaryContainer, BlingContainer } from './styled';

export default function({ pic, info = [], summary = [], bling = [] }) {
  return (
    <div>
      <Profile>
        <Photo url={pic} />
        <Detail>{info.map((ele, i) => ((i !== 1 && i < 5) || i === 12) && <div key={i}>{ele}</div>)}</Detail>
      </Profile>
      <BlingContainer style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
        {isNaN(+bling[0]) &&
          bling.map((ele, i) => (
            <div style={{ margin: '10px' }} key={i}>
              {ele}
            </div>
          ))}
      </BlingContainer>

      <SummaryContainer bling={isNaN(+bling[0])}>
        {summary.map((ele, i) => (
          <Row key={i}>
            {ele.map((value, j) => (
              <div key={j}>{value}</div>
            ))}
          </Row>
        ))}
      </SummaryContainer>
    </div>
  );
}
