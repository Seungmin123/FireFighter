const axios = require('axios');

const SLACK_URL = process.env.COW_SLACK_URL;

exports.sendSlackMessage = async function (posts) {
    let today = new Date();
    today = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    let message = {
        //text: today + ' 최근 게시물 모음! \n\n' + posts.map(post => `${post.company}(${post.creator}) - <${post.link}|${post.title}> (TAG : ${post.targetTag})`).join('\n') + '\n\n오늘도 아자 아자 안화이팅!🐳🐳🐳'
        text: today + ' 최근 게시물 모음! \n\n' + posts.map(post => `${post.company}(${post.creator}) - <${post.link}|${post.title}>`).join('\n') + '\n\n오늘도 아자 아자 안화이팅!🐳🐳🐳'
    }

    axios.post(SLACK_URL, JSON.stringify(message))
        .then(console.log('Slack MSG FINISH'))

}