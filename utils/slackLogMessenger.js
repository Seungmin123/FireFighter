const axios = require('axios');

const SLACK_DEV_URL = process.env.COW_SLACK_LOG_URL;

exports.sendSlackLogMessage = async function (posts) {
    let today = new Date();
    today = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    let message = {
        text: today + ' 로그 모니터링! \n\n' + posts.map(post => `${post.company}(${post.creator}) - <${post.link}|${post.title}> (Cat : ${post.categories})`).join('\n') + '\n\n 당분간 비교해봅시다'
    }

    console.log(SLACK_DEV_URL)

    axios.post(SLACK_DEV_URL, JSON.stringify(message))
        .then(console.log('Slack Log MSG FINISH'))

}