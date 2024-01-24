// resource2.js
const axios = require('axios');
(async () => {    
    const api_key = '4e007ac709c7435:1bwtg46ffp2iaa2'
    const response = await axios.get(`https://api.tradingeconomics.com/country/singapore?c=${api_key}`)
    console.log(response.data)
})()

const response = await axios.get(`https://api.tradingeconomics.com/country/singapore?c=${api_key}&f=xml`)

(async () => {
    const url = 'https://api.tradingeconomics.com/country/singapore';
    const headers = { 'Authorization': 'api_key' };
  
    try {
      const response = await fetch(url, { method: 'GET', headers });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  })();

const te = require('tradingeconomics');                  //1
te.login('4e007ac709c7435:1bwtg46ffp2iaa2');                    //2
data = te.getIndicatorData(country = 'singapore').then(function(data){  //3
});
  