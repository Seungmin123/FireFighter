const { parseYaml } = require('./utils/yamlParser');
const { parseRssFeed } = require('./utils/rssParser');
const { sendMessage } = require('./utils/kakaoMessenger');
const moment = require('moment')

const yamlFilePath = './lib/db.yml';

const data = parseYaml(yamlFilePath);
const rssUrls = data.map(item => item.rss).filter(rss => rss);

let yesterday = moment().subtract(1, 'days').startOf('day');
let newPosts = [];

console.log('parser ON !!! -------------------------------------------------------')
// V1
//rssUrls.forEach(rssUrl => {
//  parseRssFeed(rssUrl).then(items => {
//    items.forEach(item => {
//        let pubDate = moment(new Date(item.pubDate));
//        if (pubDate.isSame(yesterday, 'day')) {
//            newPosts.push(item);
//        }
////      const message = `Title: ${item.title}\nLink: ${item.link}`;
//      // sendMessage(access_token, message, item.link);
//    });
//  });
//});

// V2
//Promise.all(rssUrls.map(rssUrl => {
//  parseRssFeed(rssUrl).then(feed => {
//        feed.filter(item => {
//            console.log(item.title + ' : ' + moment(new Date(item.pubDate)).isSame(yesterday, 'day'))
//            return moment(new Date(item.pubDate)).isSame(yesterday, 'day')
//        })
//  })
//})).then(results => {newPosts.push(results)});

// V3
parseRssFeed(rssUrls).then(results => {
        console.log("1232132131")
        //console.log(results)
        let list = results.map(result => result.items).filter(item => moment(new Date(item.pubDate)).isSame(yesterday, 'day'))


        console.log(yesterday)
        list.map(v => console.log(v.pubDate))
    })


// Send Message
//sendMessage(newPosts)