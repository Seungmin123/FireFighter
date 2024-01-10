const { parseYaml } = require('./utils/yamlParser');
const { parseRssFeed } = require('./utils/rssParser');
const { sendSlackMessage } = require('./utils/slackMessenger');
const { sendSlackLogMessage } = require('./utils/slackLogMessenger');
const { tagSelector } = require('./utils/tagSelector');
const moment = require('moment')

const yamlFilePath = './lib/db.yml';

const data = parseYaml(yamlFilePath);
const rssUrls = data.map(item => item.rss).filter(rss => rss);

// time zone 라이브러리 쓰기 싫음
// 한국시간 기준 오전 9시 이전에 실행할 경우 substract 0 그 이후라면 1로 전날 구하기
let yesterday = moment().subtract(1, 'days').startOf('day')

parseRssFeed(rssUrls).then(results => {

    let list = results
                .map(v => v.items.map(t => {
                    return {...t, company: v.title}
                })).flat()
                .filter(item => moment(new Date(item.pubDate)).isSame(yesterday, 'day'))

    console.log(moment())
    if(list){
        sendSlackMessage(tagSelector(list))
    }
    sendSlackLogMessage(list)

})