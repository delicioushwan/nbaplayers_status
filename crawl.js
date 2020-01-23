const axios = require('axios');
const cheerio = require('cheerio');
async function scrapeRealtor() {
  try {
    let data = [];
    let firstRow = [];

    const html = await axios.get('https://www.basketball-reference.com/leagues/NBA_2020_totals.html');
    const $ = await cheerio.load(html.data);
    $('#totals_stats thead > tr > th').each((i, elem) => {
      i !== 0 && firstRow.push($(elem).text());
    });
    data.push(firstRow);

    $('#totals_stats .full_table').each((i, elem) => {
      let temp = [];
      let eleChildren = $(elem.children);
      temp.push($(eleChildren[1].children).attr('href'), $(eleChildren[1].children).text());
      for (let n = 2; n < eleChildren.length; n++) {
        temp.push($(eleChildren[n]).text());
      }
      data.push(temp);
    });
    return data;
  } catch (e) {
    return e;
  }
}

async function scrapePlayer(alpha, player) {
  const data = [];
  let firstRow = [];

  const html = await axios.get(`https://www.basketball-reference.com/players/${alpha}/${player}`);
  const $ = await cheerio.load(html.data);
  $('#all_per_game')
    .children('.table_outer_container')
    .children('#div_per_game')
    .children('#per_game')
    .children('thead')
    .children('tr')
    .children('th')
    .each((i, ele) => {
      // console.log(i);
      firstRow.push($(ele).text());
      // console.log(temp);
    });
  data.push(firstRow);

  $('#all_per_game')
    .children('.table_outer_container')
    .children('#div_per_game')
    .children('#per_game')
    .children('tbody')
    .children('.full_table')
    .each((i, ele) => {
      let temp = [];
      $(ele.children).each((i, r) => {
        temp.push($(r).text());
      });
      data.push(temp);
    });
  let playerDetail = {
    info: [],
    summary: [],
    pic: [],
    bling: [],
  };
  $('#info')
    .children()
    .each((i, ele) => {
      switch (i) {
        case 0:
          $(ele)
            .children()
            .each((j, e) => {
              if (j === 0) {
                playerDetail.pic.push($(e.children[0]).attr('src'));
              } else {
                $(e)
                  .children()
                  .each((k, element) => {
                    let part = [];
                    part.push(
                      $(element)
                        .text()
                        .replace(/↵/g, '')
                        .replace(/\s+/g, ' '),
                    );
                    playerDetail.info.push(part);
                  });
              }
            });
          break;
        case 1:
          $(ele)
            .children()
            .each((a, q) => playerDetail.bling.push($(q).text()));
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          let summary = [[], [], []];
          $(ele)
            .children()
            .each((a, c) =>
              $(c)
                .children()
                .each((q, w) =>
                  $(w)
                    .children()
                    .each((e, r) => summary[e].push($(r).text())),
                ),
            );
          playerDetail.summary.push(...summary);
          break;
        default:
          break;
      }
    });

  return { data, playerDetail };
}

exports.getList = scrapeRealtor;
exports.getPlayer = scrapePlayer;
