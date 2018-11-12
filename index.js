const rp  = require('request-promise');
const schedule = require('node-schedule');
// https://www.jianshu.com/p/8d303ff8fdeb

const token = 'a82423bd-389e-47e4-8cb1-4c415b73e8f5';
const apiObj = {
  fetchBigWheelInfo: 'fetchBigWheelInfo',
  runBigWheel: 'runBigWheel',
};
const options = {
  method: 'GET',
  uri: `https://prod.blockmagic.net/query/api/${apiObj['runBigWheel']}`,
  qs: {
    from: 'mobile_client',
    accessToken: token,
    version: '2.0.1',
    apiV: '2',
    channel: 'randao'
  },
  json: true,
}

const getWheelInfo = ()  => {
  rp(options).then(function (repos) {
          console.log('success', repos);
      })
      .catch(function (err) {
          console.log('error', err);
      });
}

let rule = new schedule.RecurrenceRule();
// rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // by 5 minute
rule.hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const scheduleFunction = ()=>{
    let count  = 1;
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob(rule, ()=>{
        console.log('定时器触发次数', count);
        console.log('scheduleFunction:' + new Date());
        count++;
        getWheelInfo();
    });
}

scheduleFunction();
