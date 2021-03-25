const stockie = require('../stockieServices');
const discordActions = require('../discordActions');

async function execute(message,resultSize) {
  setTimeout(async function () {  
    var lastNStocks  = await getLatestNStock(resultSize);
    if (lastNStocks) {
      var resp = await stockie.formatStockList(lastNStocks);
      discordActions.respondToChannel(message,resp);
    } else {
      discordActions.respondToChannel(message,"No Results are found");
    }
  }, 2000);

}
async function help(message){
  await discordActions.replyToMessage(message, "_stockie list_ command expects size eg: _stockie list 10_ retrieve 10 latest stocks")
}

async function getLatestNStock(resultSize) {
  const existingStocks = await stockie.getStocks();
  var results = [];
  for (let index = 0; index < resultSize; index++) {
    if(existingStocks.length>0)
    results.push(existingStocks.pop())
  }
  return results;
}

module.exports.execute = execute;
module.exports.help = help; 