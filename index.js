// 引用 line bot SDK
let linebot = require('linebot');
const axios = require('axios');

var data = '{"access_token": "AEnkFAIAmbojuS51","source_info":{"app_version": "2.3.1","device_time":"2021/06/16 16:45:04","device_uuid":"acf0e6a16256e492","model_id": "Redmi Note 4","os_version": "6.0","platform": "Android"}}'

var config = {
    method: 'post',
    url: 'https://api1.mcddailyapp.com/lottery/get_item',
    data: data
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
        "altText": "抽獎結果...",
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
    return axios(config).then(res=>{
        console.log(res.data)
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
            event.reply(reply(data.img,data.title))
            console.log(data)
        }()
    }

});

// Bot 所監聽的 webhook 路徑與 port，heroku 會動態存取 port 所以不能用固定的 port，沒有的話用預設的 port 5000
bot.listen('/', process.env.PORT || 5000, function () {
    console.log('測試LINEBOT是否運作！！');
});