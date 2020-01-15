const express = require('express');
const cors = require('cors');
const { getList, getPlayer } = require('./crawl');

const app = express();
const port = 80;

app.use(cors());

app.get('/list', async(req, res, next) => {
  try {
    const data = await getList();
    await res.send(data);
  
  } catch (err) {
    console.log(err)
  }
})

app.get('/players/:alph/:id', async(req, res, next) => {
  const { alph, id } = req.params;
  const data = await getPlayer(alph, id);
  await res.send(data);

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))