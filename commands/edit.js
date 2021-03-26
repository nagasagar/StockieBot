const stockie = require('../stockieServices');
const get = require('./get');
const discordActions = require('../discordActions');
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

async function execute(message, ticker, entry, target) {
  setTimeout(async function () {
    var foundStock = await get.getStockByTicker(message, ticker);
    if (foundStock) {
      foundStock.entry_limit = entry;
      foundStock.target_price = target;
      foundStock.added_by = message.author.username;
      var date_obj = new Date();
      foundStock.entry_date = date_obj.getDate()+'/'+ months[date_obj.getMonth()]+'/'+date_obj.getFullYear()
      var response = await stockie.editStock(message, foundStock);
      if (response) {
        var addedStock = await get.getStockByTicker(message, ticker);
        var addedstockStr = await stockie.formatStockBreif(message, addedStock);
        discordActions.respondToChannel(message,"Stock edited successfully \n" + addedstockStr);
      } else {
        discordActions.respondToChannel(message,"Stock could not be edited. report this to admin");
      }
    } else {
      discordActions.respondToChannel(message, "Ticker [" + ticker + "] doesn't already exist, used _stockie add <ticker>_ to add.");
    }
  }, 5000);
}

async function help(message) {
  await discordActions.replyToMessage(message, "_[stockie/watchie] edit_ command expexts ticker,entry limit,target price as input eg: _stockie edit AAPL 110 150_")
}

module.exports.execute = execute;
module.exports.help = help;

