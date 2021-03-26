const stockie = require('../stockieServices');
const discordActions = require('../discordActions');

async function execute(message,resultSize) {
  setTimeout(async function () {  
    var lastNStocks  = await getLatestNStock(message,resultSize);
    if (lastNStocks) {
      var resp = await stockie.formatStockList(message,lastNStocks);
      discordActions.respondToChannel(message,resp);
      var link2sheet = "See complete list here -> <"+ process.env.SHEET_URL+">";
      discordActions.respondToChannel(message,link2sheet);
    } else {
      discordActions.respondToChannel(message,"No Results are found");
    }
  }, 2000);

}
async function help(message){
  await discordActions.replyToMessage(message, "_[stockie/watchie] list_ command expects size eg: _stockie list 10_ retrieve 10 latest stocks")
}

async function getLatestNStock(message, resultSize) {
  const existingStocks = await stockie.getStocks(message);
  var results = [];
  for (let index = 0; index < resultSize; index++) {
    if(existingStocks.length>0)
    results.push(existingStocks.pop())
  }
  return results;
}

module.exports.execute = execute;
module.exports.help = help; 