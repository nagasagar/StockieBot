const stockie = require('../stockieServices');
const discordActions = require('../discordActions');
const get = require('./get');

async function execute(message, ticker) {
  setTimeout(async function () {  
    var foundStock  = await get.getStockByTicker(ticker);
    if (foundStock) {
      var response = await stockie.deleteStock(foundStock);
      if(response){
        discordActions.respondToChannel(message,foundStock.ticker+"("+foundStock.company+")"+" - Deleted successfully");
      }
      else{
        discordActions.respondToChannel(message, "ERROR !! error deleting "+foundStock.ticker+"("+foundStock.company+")"+" - check console logs");
      }
    } else {
      discordActions.respondToChannel(message,"Ticker Not Found");
    }
  }, 2000);

}
async function help(message){
  await discordActions.replyToMessage(message, "_stockie remove_ command expexts ticker symbolas input eg: _stockie remove AAPL_")
}

module.exports.execute = execute;
module.exports.help = help;