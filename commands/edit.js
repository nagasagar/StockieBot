const stockie = require('../stockieServices');
const get = require('./get');
const discordActions = require('../discordActions');
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

async function execute(message, ticker, entry, target) {
  setTimeout(async function () {
    var foundStock = await get.getStockByTicker(ticker);
    if (foundStock) {
      foundStock.entry_limit = entry;
      foundStock.target_price = target;
      if (response) {
        var addedStock = await get.getStockByTicker(ticker);
        var addedstockStr = await stockie.formatStockBreif(addedStock);
        discordActions.respondToChannel("Stock edited successfully \n" + addedstockStr);
      } else {
        discordActions.respondToChannel("Stock could not be edited. report this to admin");
      }
    } else {
      discordActions.respondToChannel(message, "Ticker [" + ticker + "] doesn't already exist, used _stockie add <ticker>_ to add.");
    }
  }, 5000);
}

async function help() {
  await discordActions.reply(msg, "_stockie add_ command expexts ticker,entry limit,target price as input eg: _stockie add AAPL 110 150_")
}

module.exports.execute = execute;
module.exports.help = help;

