const googleSheetApi = require('./GoogleSheetApi');
const servicehelper = require('./servicehelpers');

async function getWatchs() {
    const rawData = await googleSheetApi.getValues(process.env.WATCHLIST_SPREADSHEET_TAB);
    const stocks = await servicehelper.parseList(rawData);
    return stocks;
}

async function appendWatch(jsonObject) {
    const appendRow = await servicehelper.buildRow(jsonObject);
    return GoogleSheetApi.appendMember(process.env.WATCHLIST_SPREADSHEET_TAB, appendRow);
}

module.exports.getWatchs = getWatchs;
module.exports.appendWatch = appendWatch;