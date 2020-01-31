import React, { useState } from 'react';
import Axios from 'axios';

import useInput from '../Search/useInput';
import SeachInput from '../Search';

import { Row, Container, Button } from './styled';

export default function({ addData, setGraphData, hide }) {
  const [inputValue, inputHandler] = useInput();
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [pick, setPick] = useState([]);

  async function getData() {
    try {
      setLoading(true);
      let data = await Axios.get('http://localhost:80/list');
      await setValue(data.data);
      const ll = data.data.filter(e => {
        return e[1].toUpperCase().includes(inputValue.toUpperCase());
      });
      setList(ll);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function search(e) {
    e.preventDefault();
    if (inputValue.length === 0) return window.alert('검색어를 입력해주세요');
    if (value.length) {
      setLoading(true);
      const ll = value.filter(e => {
        return e[1].toUpperCase().includes(inputValue.toUpperCase());
      });
      setList(ll);
      setLoading(false);
    } else {
      getData();
    }
  }

  function onClickPlayer(url) {
    if (pick.length > 2) return;
    if (pick.includes(url)) {
      let temp = pick.slice(0);
      temp.splice(pick.indexOf(url), 1);
      setPick(temp);
    } else {
      setPick([...pick, url]);
    }
  }

  async function onSubmit() {
    let result = [];
    setLoading(true);
    const data = pick.map(async url => await Axios.get(`http://localhost:80${url}`));
    for (let ele of data) {
      result.push(await ele);
    }
    await setGraphData({ ...addData, additionalData: result, toggleBtn: true });
    await setLoading(false);
    await hide();
  }
  return (
    <div>
      <div>
        <SeachInput value={inputValue} inputHandler={inputHandler} button="검색" onClickHandler={search} buttonDisable={isLoading} />
      </div>
      <Container>
        {isLoading
          ? '...Loading'
          : list &&
            list.map(ele => (
              <Row onClick={onClickPlayer.bind(null, ele[0])} picked={pick.includes(ele[0])} key={ele[1]}>
                {ele[1]}
              </Row>
            ))}
      </Container>
      <div style={{ position: 'absolute', left: '0px' }}>
        <Button onClick={onSubmit} disabled={pick.length === 0}>
          {isLoading ? 'isLoading...' : '데이터 추가'}
        </Button>
      </div>
    </div>
  );
}
