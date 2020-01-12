const axios = require('axios');
const cheerio = require('cheerio');
async function scrapeRealtor() {
  try {
    let data = [];
    let firstRow = [];

    const html = await axios.get('https://www.basketball-reference.com/leagues/NBA_2020_totals.html');
    const $ = await cheerio.load(html.data);
    $('#totals_stats thead > tr > th').each((i, elem) => {
      i !== 0 && firstRow.push($(elem).text())
    })
    data.push(firstRow)

    $('#totals_stats .full_table').each((i, elem) => {
      let temp = [];
      let eleChildren = $(elem.children)
      temp.push($(eleChildren[1].children).attr('href'), $(eleChildren[1].children).text())
      for(let n = 2; n < eleChildren.length; n ++) {
        temp.push($(eleChildren[n]).text())
      }
      data.push(temp)
    });
    return data  
  } catch (e) {
    console.log(e)
  }
}

exports.getData = scrapeRealtor;