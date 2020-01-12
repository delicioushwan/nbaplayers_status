import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Row from '../../Components/Row';
import FirstRow from '../../Components/FirstRow';

import {
  List,
} from './styled';

export default function () {
  const [state, setState] = useState([]);

  async function getData () {
    let data = await Axios.get('http://localhost:80')
    await setState(data.data)
  }


  useEffect(() => {
    getData();
  }, [])

  return (
    <List>
      <FirstRow value={state[0]} />
      <Row value={state} />
      
    </List>
  );
}
