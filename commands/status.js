const stockie = require('../stockieServices');
const get = require('./get');
const discordActions = require('../discordActions');
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

async function execute(message, ticker, status) {
  setTimeout(async function () {
    var foundStock = await get.getStockByTicker(message,ticker);
    if (foundStock) {
      foundStock.status = status;
      foundStock.added_by = message.author.username;
      var date_obj = new Date();
      foundStock.entry_date = date_obj.getDate()+'/'+ months[date_obj.getMonth()]+'/'+date_obj.getFullYear()
      var response = await stockie.editStock(message,foundStock);
      if (response) {
        var addedStock = await get.getStockByTicker(message,ticker);
        var addedstockStr = await stockie.formatStockDetail(message,addedStock);
        discordActions.respondToChannel(message,"Stock status updated\n" + addedstockStr);
      } else {
        discordActions.respondToChannel(message,"Stock could not be edited. report this to admin");
      }
    } else {
      discordActions.respondToChannel(message, "Ticker [" + ticker + "] doesn't already exist, used _stockie add <ticker>_ to add.");
    }
  }, 5000);
}

async function help(message) {
  await discordActions.replyToMessage(message, "_[stockie/watchie] status_ command expexts ticker as input eg: _stockie status AAPL SOLD_ OR _stockie status AAPL ON_")
}

module.exports.execute = execute;
module.exports.help = help;

