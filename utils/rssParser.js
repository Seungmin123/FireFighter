const Parser = require('rss-parser');
const parser = new Parser();

// V1
//exports.parseRssFeed = async function (rssUrl) {
//    try {
//        const feed = await parser.parseURL(rssUrl);
//        return feed.items;
//    } catch (error) {
//        console.log(error)
//        return [];
//    }
//};

// V2
async function parseRss(url) {
    let feed = await parser.parseURL(url)
    return feed
}

async function parseMultipleRss(urls, concurrentLimit = 5) {
    let results = [];

    for (let i = 0; i < urls.length; i += concurrentLimit) {
        let chunk = urls.slice(i, i + concurrentLimit);
        let promises = chunk.map(url => parseRss(url));

        // Promise.allSettled를 사용하여 모든 Promise가 완료될 때까지 대기
        let settled = await Promise.allSettled(promises);

        // 성공한 결과만 results에 추가
        for (let result of settled) {
            if (result.status === "fulfilled") {
                results.push(result.value);
            }
        }

        if(i % 20 == 0) console.log(Math.floor(i / urls.length * 100 )+ '%....')
    }

    return results;
}

exports.parseRssFeed = parseMultipleRss
