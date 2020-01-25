import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Profile from './Components/Profile';
import DataTable from './Components/DataTable';
import Graph from './Components/Graph';

import pieGraph from '../../Utils/Pie';
import barGraph from '../../Utils/Bar';

import { Container, ProfileContainer, GraphContainer, ButtonContainer, ComparisonBtn, TypeSelector, ToggleGraphBtn } from './styled';

export default function({ location: { pathname }, history, value }) {
  const [state, setState] = useState({
    isLoading: false,
    playerDetail: {},
    data: [],
    toggleBtn: false,
  });

  function ToggleHandler(e) {
    const { name } = e.target;
    const { toggleBtn } = state;
    setState({
      ...state,
      [name]: !toggleBtn,
    });
    console.log(name, value);
    console.log(state);
  }
  async function getData() {
    let data = await Axios.get(`http://localhost:80${pathname}`);
    await setState({ ...state, ...data.data, isLoading: true });
  }
  useEffect(() => {
    getData();
  }, []);
  const { pic, info, summary } = state.playerDetail;
  const { data, toggleBtn } = state;
  console.log(state);
  return (
    state.isLoading && (
      <Container>
        <ProfileContainer>
          <Profile pic={pic} info={info} summary={summary} />
          {/* 컴포넌트화하기 그래프함수 만들고 동일한 크기와 스타일의 영역안에 그래프함수넣기*/}
          <GraphContainer>
            <Graph graph={pieGraph} graphId="profilePie" data={data} />
            <Graph graph={barGraph} graphId="profileBar" data={summary} />
          </GraphContainer>
        </ProfileContainer>
        <ButtonContainer>
          <div>
            <ToggleGraphBtn name="toggleBtn" onClick={ToggleHandler}>
              {toggleBtn ? ' 표 ' : '그래프'}
            </ToggleGraphBtn>
            <ComparisonBtn>비교하기</ComparisonBtn>
          </div>
          {toggleBtn && <TypeSelector />}
        </ButtonContainer>
        {toggleBtn ? null : <DataTable data={data} />}
      </Container>
    )
  );
}
