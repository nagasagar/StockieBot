  const discordActions = require('../discordActions');

async function executeStockieHelp(message) {
    var helpStr = "";
    var line1 = "stockie add [stock_ticker] [entry_limit] [target]" + "\n";
    var line2 = "stockie edit [stock_ticker] [entry_limit] [target]" + "\n";
    var line3 = "stockie remove [stock_ticker]" + "\n";
    var line4 = "stockie get [stock_ticker]" + "\n";
    var line4 = "stockie list [last_n_results]" + "\n";
    var line5 = "stockie status [stock_ticker] [ON / OFF]" + "\n";
    var line6 = "stockie suggestor [stock_ticker] [suggestor_name]" + "\n";
    var line7 = "stockie note [stock_ticker] [notes] - there is current limitation that notes cannot have spaces" + "\n\n";
    var line8 = "all command syntax are same for watchie" + "\n";
    helpStr = helpStr.concat(line1, line2, line3, line4, line5, line6, line7, line8, "\n");
    discordActions.respondToChannel(message,helpStr);
}

module.exports.executeStockieHelp = executeStockieHelp;