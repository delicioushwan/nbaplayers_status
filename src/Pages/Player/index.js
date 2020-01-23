import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { Container, Profile, Photo, Detail, Row, SummaryContainer, ProfileContainer } from './styled';

export default function({ location: { pathname }, history, value }) {
  const [state, setState] = useState({
    isLoading: false,
    playerDetail: {},
    data: [],
  });
  async function getData() {
    let data = await Axios.get(`http://localhost:80${pathname}`);
    await setState({ ...data.data, isLoading: true });
  }
  useEffect(() => {
    getData();
  }, []);
  const { pic, info, summary } = state.playerDetail;
  console.log(state);
  return (
    state.isLoading && (
      <Container>
        <ProfileContainer>
          {/* 컴포넌트화하기 */}

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
          {/* 컴포넌트화하기 그래프함수 만들고 동일한 크기와 스타일의 영역안에 그래프함수넣기*/}
          <div></div>
        </ProfileContainer>
      </Container>
    )
  );
}
