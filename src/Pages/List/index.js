import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Row from './Components/Row';
import FirstRow from './Components/FirstRow';
import Loading from '../../Components/Loading';
import Pagination from '../../Components/Pagination';
import usePaginate from '../../Components/Pagination/usePaginate';

import { List } from './styled';

export default function({ history }) {
  const [state, setState] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setPage] = usePaginate();
  const limit = 30;
  async function getData() {
    try {
      setLoading(true);
      let data = await Axios.get('http://localhost:80/list');
      await setState(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <List>
          <FirstRow value={state[0]} />
          <Row value={state} history={history} currentPage={currentPage} limit={limit} />
          <Pagination handler={setPage} currentPage={currentPage} values={state} limit={limit} />
        </List>
      )}
    </>
  );
}
