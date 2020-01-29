import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import useInput from '../Search/useInput';
import SeachInput from '../Search';

export default function() {
  const { inputValue, inputHandler } = useInput();
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState([]);

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

  function search() {
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

  return (
    <div>
      <div>
        <SeachInput value={inputValue} inputHandler={inputHandler} button="검색" onClickHandler={search} buttonDisable={isLoading} />
      </div>
      <div>{isLoading ? '...Loading' : list && list.map(ele => <div>{ele[1]}</div>)}</div>
    </div>
  );
}
