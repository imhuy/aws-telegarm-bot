
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const url = 'https://api.telegram.org/bot';
const apiToken = '1665962763:AAGHR3umaM5IeNwXp6y2CJVmBpwtc1yRov4';
const access_token = 'EAAAAZAw4FxQIBANZAdpLcr3QZCH5SvkG1bJvhJ6zKhMmqUOF8reNgdUWvh8bHwpbaZCx5Fzgozs8kBif7ZCOeZBMxMRFdSctf6SLp9ZA8nUJ5G7GQp24VmLyBcjNe7UTacyWEwAwFc9ZA11rPxOCePd33mEVsB4ytXv5Qx4WP2aRtAZDZD';

function getRandomElement() {
    var array = [1893231640899433];
    let randomIndex = Math.floor((Math.random() * array.length));
    return array[randomIndex];
}

async function getRandomImage() {
    let random = getRandomElement()
    var url = `https://graph.facebook.com/v2.9/${random}/photos?access_token=${access_token}&fields=images&limit=1000`
    var imageUrls = axios.get(url).then((res) => {
      let data = res.data;
      var arr = data.data.map(data => data.images[0].source);
      let randomIndex = Math.floor((Math.random() * arr.length));
      return arr[randomIndex];
    }).catch((err) => err)
    return imageUrls;
};

app.use(bodyParser.json());
app.use(cors());
app.post('/', async (req, res) => {
    // console.log(req.body);
    const chatId = req.body.message.chat.id;
    const sentMessage = req.body.message.text;
    let r = await getRandomImage();
    if (sentMessage == 'ảnh' || sentMessage == 'Ảnh') {
      
        axios.post(`${url}${apiToken}/sendPhoto`,
            {
                chat_id: chatId,
                photo: r
            })
            .then((response) => {
                res.status(200).send(response);
            }).catch((error) => {
                res.send(error);
            });
    } else {
        // if no hello present, just respond with 200 
        res.status(200).send({});
    }
});
// Listening
module.exports = app;