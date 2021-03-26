const stockie = require('../stockieServices');
const discordActions = require('../discordActions');

async function execute(message,searchTicker) {
  setTimeout(async function () {  
    var foundStock  = await getStockByTicker(message, searchTicker);
    if (foundStock) {
      var resp = await stockie.formatStockDetail(message, foundStock);
      discordActions.respondToChannel(message,resp);
    } else {
      discordActions.respondToChannel(message,"Ticker Not Found");
    }
  }, 2000);

}
async function help(message){
  await discordActions.replyToMessage(message, "_[stockie/watchie] get_ command expexts ticker symbolas input eg: _stockie get AAPL_. same syntax with watchie")
}

async function getStockByTicker(message, searchTicker) {
  const existingStocks = await stockie.getStocks(message);
  var searchStock = null;
  existingStocks.forEach(s => {
    if (s.ticker.toUpperCase() === searchTicker.toUpperCase()) {
      searchStock = s;
    }
  });
  return searchStock;
}

module.exports.getStockByTicker = getStockByTicker;
module.exports.execute = execute;
module.exports.help = help;