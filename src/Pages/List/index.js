import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Row from './Components/Row';
import FirstRow from './Components/FirstRow';

import { List } from './styled';

export default function({ history }) {
  const [state, setState] = useState([]);

  async function getData() {
    try {
      let data = await Axios.get('http://localhost:80/list');
      await setState(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <List>
      <FirstRow value={state[0]} />
      <Row value={state} history={history} />
    </List>
  );
}
