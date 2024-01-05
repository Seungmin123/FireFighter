const { parseYaml } = require('./utils/yamlParser');
const { parseRssFeed } = require('./utils/rssParser');
const { sendSlackMessage } = require('./utils/slackMessenger');
const { tagSelector } = require('./utils/tagSelector');
const moment = require('moment')

const yamlFilePath = './lib/db.yml';

const data = parseYaml(yamlFilePath);
const rssUrls = data.map(item => item.rss).filter(rss => rss);

// time zone 라이브러리 쓰기 싫음
// 한국시간 기준 오전 9시 이전에 실행할 경우 substract 0 그 이후라면 1로 전날 구하기
let yesterday = moment().subtract(1, 'days').startOf('day')

parseRssFeed(rssUrls).then(results => {

    // 최근 n일 내 업데이트 된 게시물
//    let oneWeekAgo = moment().subtract(90, 'days');  // 일주일 전
//    let now = moment();  // 현재 시간
//
//    let list = results
//                    .map(v => v.items.map(t => {
//                        return {...t, company: v.title}
//                    })).flat()
//                    .filter(item => moment(new Date(item.pubDate)).isBetween(oneWeekAgo, now))
//
//    list = tagSelector(list)
//    list.map(v => console.log(v.company + ' : ' + v.title + ' :: ' + v.pubDate + '(' + v.targetTag + ')' + '[' + v.categories + ']'))

    let list = results
                .map(v => v.items.map(t => {
                    return {...t, company: v.title}
                })).flat()
                .filter(item => moment(new Date(item.pubDate)).isSame(yesterday, 'day'))

    sendSlackMessage(tagSelector(list))

})