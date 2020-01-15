import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function ({location: {pathname}, history, value}) {
  const [state, setState] = useState([]);
  console.log(pathname, value)
  console.log(history)
  async function getData () {
    let data = await Axios.get(`http://localhost:80${pathname}`)
    await setState(data.data)
    console.log(data.data)
  }


  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      sdf
    </div>
  );
}
