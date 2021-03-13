const discordActions = require('../discordActions');

async function executeStockieHelp(message) {
    var helpStr = "";
    var line1 = "stockie add [stock_ticker] [entry_limit] [target]" + "\n";
    var line2 = "stockie edit [stock_ticker] [entry_limit] [target]" + "\n";
    var line3 = "stockie remove [stock_ticker]" + "\n";
    var line4 = "stockie get [stock_ticker]" + "\n";
    var line4 = "stockie list [last_n_results]" + "\n";
    helpStr = helpStr.concat(line1, line2, line3, line4, "\n");
    discordActions.respondToChannel(message,helpStr);
}

module.exports.executeStockieHelp = executeStockieHelp;