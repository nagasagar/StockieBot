const stockie = require('../stockieServices');
const get = require('./get');
const discordActions = require('../discordActions');
var months    = ['January','February','March','April','May','June','July','August','September','October','November','December']

async function execute(message, ticker, entry, target) {
  setTimeout(async function () {
    var foundStock  = await get.getStockByTicker(message,ticker);
    if (foundStock) {
      discordActions.respondToChannel(message,"Ticker ["+ticker+"] already exist, used _stockie edit <ticker>_ to edit.");
    } else {
      var date_obj = new Date();
      var newStock = {
        slno : '=ROW()-1',
        ticker : ticker.toUpperCase(),
        company : '=GOOGLEFINANCE(B:B, "name")',
        entry_limit : entry,
        target_price : target,
        current_price : '=GOOGLEFINANCE(B:B, "price")',
        gapto_target : '=F:F-E:E',
        gapto_target_percentage : '=ROUND((F:F-E:E)/F:F*100)',
        entry_date : date_obj.getDate()+'/'+ months[date_obj.getMonth()]+'/'+date_obj.getFullYear(),
        added_by: message.author.username,
        suggested_by : 'THAKUR',
        note : '',
        status : 'ON'
      }
      var response = await stockie.appendStock(message, newStock);
      if(response){
        var addedStock = await get.getStockByTicker(message, ticker);
        var addedstockStr = await stockie.formatStockBreif(message, addedStock);
        discordActions.respondToChannel(message, "Stock added successfully \n"+addedstockStr);
      }else{
        discordActions.respondToChannel(message, "Stock could not be added. report this to admin")
      }
    }
  }, 5000);
}

async function help(message){
  await discordActions.replyToMessage(message, "_[stockie/watchie] add_ command expexts ticker,entry limit,target price as input eg: _stockie add AAPL 110 150_")
}

module.exports.execute = execute;
module.exports.help = help;

