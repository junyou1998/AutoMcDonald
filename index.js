// 引用 line bot SDK
let linebot = require('linebot');
const axios = require('axios');

var data = '{"access_token":"LYoAenEAsdAIiBGB","source_info":{"app_version":"2.2.6","device_time":"2020/07/24 14:23:02","device_uuid":"29a19074f5983175","model_id":"Redmi Note 4","os_version":"6.0","platform":"Android"}}';
var data1 = '{"access_token":"IKfDvAAoNQAUAAC7","offset":0,"source_info":{"app_version":"2.2.6","device_time":"2020/07/24 22:06:24","device_uuid":"29a19074f5983176","model_id":"Mi 8 lite","os_version":"9.0","platform":"Android"}}'
var data2 = '{"access_token":"vjyhqFIfDOj5tgAA","source_info":{"app_version":"2.2.6","device_time":"2020/07/24 22:33:18","device_uuid":"29a19074f5983177","model_id":"Mi 8 lite","os_version":"10.0","platform":"Android"}}'
var data3 = '{"access_token":"+fz54AYAN+fFAO8A","source_info":{"app_version":"2.2.6","device_time":"2020/07/24 13:25:02","device_uuid":"29a19074f5983176","model_id":"Redmi Note 8","os_version":"10.0","platform":"Android"}}'
var data4 = '{"access_token":"1QCR97jjoDDgAH4A","source_info":{"app_version":"2.2.6","device_time":"2020/07/24 13:25:02","device_uuid":"29a19074f5983276","model_id":"Redmi Note 8","os_version":"10.0","platform":"Android"}}'
var data5 = '{"access_token":"AFgBAebY7wCg4J7r","source_info":{"app_version":"2.2.6","device_time":"2020/07/24 13:25:02","device_uuid":"29a19074f5983276","model_id":"Zenfone 2 Laser","os_version":"6.0","platform":"Android"}}'


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
var config3 = {
    method: 'post',
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    data: data3
};
var config4 = {
    method: 'post',
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    data: data4
};
var config5 = {
    method: 'post',
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    data: data5
};

// 初始化 line bot 需要的資訊，在 Heroku 上的設定的 Config Vars，可參考 Step2
let bot = linebot({
    channelId: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

function reply(img,title){
    let msg = {
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
    }

    return msg;
}

async function lottery(config){
    let draw = await axios(config)
    let data = draw.data
    return data
}

function getlottery(config){
    return axiox(config).then(res=>{
        let data = res.data
        let img,title

        if('coupon' in data.results){
            img = data.results.coupon.object_info.image.url;
            title = data.results.coupon.object_info.title;
        }
        else{
            img = data.results.sticker.object_info.image.url;
            title = data.results.sticker.object_info.title;
        }

        return {
            data:data,
            title: title,
            img: img
        }
    })
}


// 當有人傳送訊息給 Bot 時
bot.on('message', function (event) {
    // 回覆訊息給使用者 (一問一答所以是回覆不是推送)
    // event.reply(`${event.message.text}`);
    if (event.message.text == '佑佑要抽麥當當') {
        console.log('開始抽籤(佑)')

        ~async function(){
            let data = await getlottery(config)
            // event.reply(reply(data.img,data.title))
            console.log(data)
        }()
    }
    else if (event.message.text == '安安要抽麥當當') {
        console.log('開始抽籤(安)')
        axios(config1)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let img,title;
                if('coupon' in response.data.results){
                    img = response.data.results.coupon.object_info.image.url;
                    title = response.data.results.coupon.object_info.title;
                }
                else{
                    img = response.data.results.sticker.object_info.image.url;
                    title = response.data.results.sticker.object_info.title;
                }
                event.reply(reply(img,title));

                
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
                let img,title;
                if('coupon' in response.data.results){
                    img = response.data.results.coupon.object_info.image.url;
                    title = response.data.results.coupon.object_info.title;
                }
                else{
                    img = response.data.results.sticker.object_info.image.url;
                    title = response.data.results.sticker.object_info.title;
                }
                event.reply(reply(img,title));

                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else if (event.message.text == '梅梅要抽麥當當') {
        console.log('開始抽籤(梅)')
        axios(config3)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let img,title;
                if('coupon' in response.data.results){
                    img = response.data.results.coupon.object_info.image.url;
                    title = response.data.results.coupon.object_info.title;
                }
                else{
                    img = response.data.results.sticker.object_info.image.url;
                    title = response.data.results.sticker.object_info.title;
                }
                event.reply(reply(img,title));
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else if (event.message.text == '佑佑(2)要抽麥當當') {
        console.log('開始抽籤(佑2)')
        axios(config4)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let img,title;
                if('coupon' in response.data.results){
                    img = response.data.results.coupon.object_info.image.url;
                    title = response.data.results.coupon.object_info.title;
                }
                else{
                    img = response.data.results.sticker.object_info.image.url;
                    title = response.data.results.sticker.object_info.title;
                }
                event.reply(reply(img,title));
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else if (event.message.text == '梅梅(2)要抽麥當當') {
        console.log('開始抽籤(梅2)')
        axios(config5)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let img,title;
                if('coupon' in response.data.results){
                    img = response.data.results.coupon.object_info.image.url;
                    title = response.data.results.coupon.object_info.title;
                }
                else{
                    img = response.data.results.sticker.object_info.image.url;
                    title = response.data.results.sticker.object_info.title;
                }
                event.reply(reply(img,title));
                
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