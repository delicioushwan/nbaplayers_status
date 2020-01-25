import React from 'react';

import { Profile, Photo, Detail, Row, SummaryContainer } from './styled';

export default function({ pic, info, summary }) {
  return (
    <div>
      <Profile>
        <Photo url={pic} />
        <Detail>{info.map((ele, i) => ((i !== 1 && i < 5) || i === 12) && <div key={i}>{ele}</div>)}</Detail>
      </Profile>
      <SummaryContainer>
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
