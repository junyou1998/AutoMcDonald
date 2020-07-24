// 引用 line bot SDK
let linebot = require('linebot');
const axios = require('axios');

var data = '{"access_token":"LYoAenEAsdAIiBGB","source_info":{"app_version":"2.2.6","device_time":"2020/07/24 14:23:02","device_uuid":"29a19074f5983175","model_id":"Redmi Note 4","os_version":"6.0","platform":"Android"}}';
var data1 = '{"access_token":"IKfDvAAoNQAUAAC7","offset":0,"source_info":{"app_version":"2.2.6","device_time":"2020/07/24 22:06:24","device_uuid":"29a19074f5983176","model_id":"Redmi Note 4","os_version":"6.0","platform":"Android"}}'
var data2 = '{"access_token":"vjyhqFIfDOj5tgAA","source_info":{"app_version":"2.2.6","device_time":"2020/07/24 22:33:18","device_uuid":"29a19074f5983177","model_id":"Mi 8 lite","os_version":"10.0","platform":"Android"}}'

var config = {
    method: 'post',
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    data: data
};
var config1 = {
    method: 'post',
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    data: data1
};
var config2 = {
    method: 'post',
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    data: data2
};

// 初始化 line bot 需要的資訊，在 Heroku 上的設定的 Config Vars，可參考 Step2
let bot = linebot({
    channelId: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});



// 當有人傳送訊息給 Bot 時
bot.on('message', function (event) {
    // 回覆訊息給使用者 (一問一答所以是回覆不是推送)
    // event.reply(`${event.message.text}`);
    if (event.message.text == '佑佑要抽麥當當') {
        console.log('開始抽籤(佑)')
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if('coupon' in response.data.results){
                    let img = response.data.results.coupon.object_info.image.url;
                    let title = response.data.results.coupon.object_info.title;
                }
                else{
                    let img = response.data.results.sticker.object_info.image.url;
                    let title = response.data.results.sticker.object_info.title;
                }
                event.reply({
                    "type": "flex",
                    "altText": "Flex Message",
                    "contents": {
                        "type": "bubble",
                        "hero": {
                            "type": "image",
                            "url": img,
                            "size": "full",
                            "aspectRatio": "3:4",
                            "aspectMode": "cover"
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [{
                                "type": "text",
                                "text": title,
                                "flex": 5,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                            }]
                        }
                    }
                });

                console.log(response.data.results.coupon.object_info.image.url)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else if (event.message.text == '安安要抽麥當當') {
        console.log('開始抽籤(安)')
        axios(config1)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if('coupon' in response.data.results){
                    let img = response.data.results.coupon.object_info.image.url;
                    let title = response.data.results.coupon.object_info.title;
                }
                else{
                    let img = response.data.results.sticker.object_info.image.url;
                    let title = response.data.results.sticker.object_info.title;
                }
                event.reply({
                    "type": "flex",
                    "altText": "Flex Message",
                    "contents": {
                        "type": "bubble",
                        "hero": {
                            "type": "image",
                            "url": img,
                            "size": "full",
                            "aspectRatio": "3:4",
                            "aspectMode": "cover"
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [{
                                "type": "text",
                                "text": title,
                                "flex": 5,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                            }]
                        }
                    }
                });

                console.log(response.data.results.coupon.object_info.image.url)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else if (event.message.text == '亮亮要抽麥當當') {
        console.log('開始抽籤(亮)')
        axios(config2)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                
                if('coupon' in response.data.results){
                    let img = response.data.results.coupon.object_info.image.url;
                    let title = response.data.results.coupon.object_info.title;
                }
                else{
                    let img = response.data.results.sticker.object_info.image.url;
                    let title = response.data.results.sticker.object_info.title;
                }
                event.reply({
                    "type": "flex",
                    "altText": "Flex Message",
                    "contents": {
                        "type": "bubble",
                        "hero": {
                            "type": "image",
                            "url": img,
                            "size": "full",
                            "aspectRatio": "3:4",
                            "aspectMode": "cover"
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [{
                                "type": "text",
                                "text": title,
                                "flex": 5,
                                "size": "sm",
                                "color": "#666666",
                                "wrap": true
                            }]
                        }
                    }
                });

                console.log(response.data.results.coupon.object_info.image.url)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

});

// Bot 所監聽的 webhook 路徑與 port，heroku 會動態存取 port 所以不能用固定的 port，沒有的話用預設的 port 5000
bot.listen('/', process.env.PORT || 5000, function () {
    console.log('測試LINEBOT是否運作！！');
});