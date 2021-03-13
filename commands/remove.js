const stockie = require('../stockieServices');
const discordActions = require('../discordActions');
const get = require('./get');

async function execute(message) {
  setTimeout(async function () {  
    var foundStock  = await get.getStockByTicker(searchTicker);
    if (foundStock) {
      await stockie.deleteStock(foundStock);
      discordActions.respondToChannel(message,"Deleted successfully");
    } else {
      discordActions.respondToChannel(message,"Ticker Not Found");
    }
  }, 2000);

}
async function help(msg){
  await discordActions.reply(msg, "_stockie remove_ command expexts ticker symbolas input eg: _stockie remove AAPL_")
}

module.exports.execute = execute;
module.exports.help = help;