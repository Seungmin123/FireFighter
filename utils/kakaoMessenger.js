const axios = require('axios');

//const ACCESS_TOKEN = process.env.KAKAO_ACCESS_TOKEN;
const ACCESS_TOKEN = '59bddf8b63947da967664b1437b8951d';

exports.sendKakaoMessage = async function (posts) {
    let headers = {
      'Authorization': 'Bearer \'' + ACCESS_TOKEN + '\'',
    };

    let bodies = {
      'template_object': JSON.stringify({
        'object_type': 'text',
        'text': posts.map(post => `${post.title}: ${post.link}`).join('\n'),
      }),
    };

    axios
      .post('https://kapi.kakao.com/v2/api/talk/memo/default/send', bodies, { headers: headers })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
};