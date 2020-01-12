const express = require('express');
const cors = require('cors');
const { getData } = require('./crawl');

const app = express();
const port = 80;

app.use(cors());

app.get('/', async(req, res, next) => {
  const data = await getData();
  await res.send(data);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))