const stockie = require('../stockieServices');
const get = require('./get');
const discordActions = require('../discordActions');
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

async function execute(message, ticker, note) {
  setTimeout(async function () {
    var foundStock = await get.getStockByTicker(ticker);
    if (foundStock) {
      foundStock.note = note;
      foundStock.added_by = message.author.username;
      var date_obj = new Date();
      foundStock.entry_date = date_obj.getDate()+'/'+ months[date_obj.getMonth()]+'/'+date_obj.getFullYear()
      var response = await stockie.editStock(foundStock);
      if (response) {
        var addedStock = await get.getStockByTicker(ticker);
        var addedstockStr = await stockie.formatStockDetail(addedStock);
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
  await discordActions.replyToMessage(message, "_stockie note_ command expexts ticker, note as input eg: _stockie note AAPL stoploss-at-100_ ,please add notes-with-out-spaces-use-minus-instead-of-space.This is currently a limitation")
}

module.exports.execute = execute;
module.exports.help = help;

