/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import useModal from '../../Components/Modal/useModal';
import Modal from '../../Components/Modal';
import Profile from './Components/Profile';
import DataTable from './Components/DataTable';
import ModalContent from './Components/ModalContent';

import PieGraph from '../../Components/Pie';
import BarGraph from '../../Components/Bar';
import PathGraph from '../../Components/Path';

import { Container, ProfileContainer, GraphContainer, ButtonContainer, ComparisonBtn, TypeSelector, ToggleGraphBtn } from './styled';

export default function({ location: { pathname }, history, value }) {
  const [state, setState] = useState({
    isLoading: false,
    playerDetail: {},
    data: [],
    toggleBtn: false,
  });

  const [select, setSelect] = useState(29);
  function ToggleHandler(e) {
    const { name } = e.target;
    const { toggleBtn } = state;
    setState({
      ...state,
      [name]: !toggleBtn,
    });
  }
  async function getData() {
    let data = await Axios.get(`http://localhost:80${pathname}`);
    await setState({ ...state, ...data.data, isLoading: true });
  }
  useEffect(() => {
    getData();
  }, []);
  const { pic, info, summary, bling } = state.playerDetail;
  const { data, toggleBtn } = state;
  const { isShowing, toggle } = useModal();
  console.log(state);
  return (
    state.isLoading && (
      <Container>
        <ProfileContainer id="profileContainer">
          <Profile pic={pic} info={info} summary={summary} bling={bling} />
          {/* 컴포넌트화하기 그래프함수 만들고 동일한 크기와 스타일의 영역안에 그래프함수넣기*/}
          <GraphContainer>
            <PieGraph graphId="profilePie" data={data} />
            <BarGraph graphId="profileBar" data={summary} />
          </GraphContainer>
        </ProfileContainer>
        <ButtonContainer>
          <div>
            <ToggleGraphBtn name="toggleBtn" onClick={ToggleHandler}>
              {toggleBtn ? ' 표 ' : '그래프'}
            </ToggleGraphBtn>
            <ComparisonBtn onClick={toggle}>비교하기</ComparisonBtn>
            <Modal isShowing={isShowing} hide={toggle} title="선수 비교">
              <ModalContent value={value} />
            </Modal>
          </div>
          {toggleBtn && (
            <TypeSelector value={select} onChange={e => setSelect(e.target.value)}>
              {data[0].map(
                (stat, i) =>
                  i > 4 && (
                    <option key={i} value={i}>
                      {stat}
                    </option>
                  ),
              )}
            </TypeSelector>
          )}
        </ButtonContainer>
        {toggleBtn ? <PathGraph graphId="DataTableGraph" data={data} barChartType={select} /> : <DataTable data={data} />}
      </Container>
    )
  );
}
