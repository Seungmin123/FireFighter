const { parseYaml } = require('./utils/yamlParser');
const { parseRssFeed } = require('./utils/rssParser');
const { sendSlackMessage } = require('./utils/slackMessenger');
const { tagSelector } = require('./utils/tagSelector');
const moment = require('moment')

const yamlFilePath = './lib/db.yml';

const data = parseYaml(yamlFilePath);
const rssUrls = data.map(item => item.rss).filter(rss => rss);

let yesterday = moment().subtract(1, 'days').startOf('day')

parseRssFeed(rssUrls).then(results => {

    // 최근 3일 내 업데이트 된 게시물
    //let oneWeekAgo = moment().subtract(7, 'days');  // 일주일 전
    //let now = moment();  // 현재 시간
    //let list = results.filter(item => moment(new Date(item.pubDate)).isBetween(oneWeekAgo, now))

    let list = results
                .map(v => v.items).flat()
                .filter(item => moment(new Date(item.pubDate)).isSame(yesterday, 'day'))

    sendSlackMessage(tagSelector(list))

})