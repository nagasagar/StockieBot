const stockie = require('../stockieServices');
const get = require('./get');
const discordActions = require('../discordActions');
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

async function execute(message, ticker,suggestor) {
  setTimeout(async function () {
    var foundStock = await get.getStockByTicker(ticker);
    if (foundStock) {
      foundStock.suggested_by = suggestor;
      foundStock.added_by = message.author.username;
      var date_obj = new Date();
      foundStock.entry_date = date_obj.getDate()+'/'+ months[date_obj.getMonth()]+'/'+date_obj.getFullYear()
      var response = await stockie.editStock(foundStock);
      if (response) {
        var addedStock = await get.getStockByTicker(ticker);
        var addedstockStr = await stockie.formatStockDetail(addedStock);
        discordActions.respondToChannel(message,"Stock suggestor updated \n" + addedstockStr);
      } else {
        discordActions.respondToChannel(message,"Stock could not be edited. report this to admin");
      }
    } else {
      discordActions.respondToChannel(message, "Ticker [" + ticker + "] doesn't already exist, used _stockie add <ticker>_ to add.");
    }
  }, 5000);
}

async function help(message) {
  await discordActions.replyToMessage(message, "_stockie suggestor_ command expexts ticker suggestor as input eg: _stockie suggestor AAPL MISX_")
}

module.exports.execute = execute;
module.exports.help = help;

