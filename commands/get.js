const stockie = require('../stockieServices');
const discordActions = require('../discordActions');

async function execute(message,searchTicker) {
  setTimeout(async function () {  
    var foundStock  = await getStockByTicker(searchTicker);
    if (foundStock) {
      var resp = await stockie.formatStockDetail(foundStock);
      discordActions.respondToChannel(message,resp);
    } else {
      discordActions.respondToChannel(message,"Ticker Not Found");
    }
  }, 2000);

}
async function help(){
  await discordActions.reply(msg, "_stockie get_ command expexts ticker symbolas input eg: _stockie get AAPL_")
}

async function getStockByTicker(searchTicker) {
  const existingStocks = await stockie.getStocks();
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