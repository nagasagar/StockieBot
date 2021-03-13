const googleSheetApi = require('./GoogleSheetApi');
const servicehelper = require('./servicehelpers');
const stringTable = require('string-table');

async function getStocks() {
    const rawData = await googleSheetApi.getValues(process.env.POSITIONS_SPREADSHEET_TAB);
    const stocks = await servicehelper.parseList(rawData);
    return stocks;
}
async function getNumberOfStocks() {
    const numberOfStocks = await googleSheetApi.getNumberOfRows(process.env.POSITIONS_SPREADSHEET_TAB);
    return numberOfStocks-1;
}


async function appendStock(jsonObject) {
    const appendRow = await servicehelper.buildRow(jsonObject);
    return googleSheetApi.appendRow(process.env.POSITIONS_SPREADSHEET_TAB, appendRow);
}

async function editStock(jsonObject) {
    const appendRow = await servicehelper.buildRow(jsonObject);
    return googleSheetApi.editRow(process.env.POSITIONS_SPREADSHEET_TAB,parseInt(jsonObject.sln)+1, appendRow);
}

async function deleteStock(slno) {
    //TODO
    const appendRow = await servicehelper.buildRow(jsonObject);
    return googleSheetApi.deleteRow(process.env.POSITIONS_SPREADSHEET_TAB, appendRow);
}

async function setStockSold(ticker) {
    //TODO
    const appendRow = await servicehelper.buildRow(jsonObject);
    return googleSheetApi.editRow(process.env.POSITIONS_SPREADSHEET_TAB, appendRow);
}

async function setStockSuggestor(slno, suggestor) {
    //TODO
    const appendRow = await servicehelper.buildRow(jsonObject);
    return googleSheetApi.editRow(process.env.POSITIONS_SPREADSHEET_TAB, appendRow);
}

async function addStockNote(slno, note) {
    //TODO
    const appendRow = await servicehelper.buildRow(jsonObject);
    return googleSheetApi.editRow(process.env.POSITIONS_SPREADSHEET_TAB, appendRow);
}

async function formatStockDetail(stockobject) {
    let resp = "";
    let line1 = ":hash: sln = ".concat(stockobject.sln, "\n");
    let line2 = ":tickets: Ticker = **".concat(stockobject.ticker.toUpperCase(), "** ("+stockobject.company+")\n");
    let line3 = ":boomerang: Entry Limit= ".concat(stockobject.entry_limit, "\n");
    let line4 = ":dart: Target Price= ".concat(stockobject.target_price, "\n");
    let line5 = ":moneybag: Current Price= ".concat(stockobject.current_price, "\n");
    let line6 = ":eagle: Gap To Target = ".concat(stockobject.gapto_target, "\n");
    let line7 = ":infinity: Gap To Target in % = ".concat(stockobject.gapto_target_percentage, "%\n");
    let line8 = ":calendar: Entry Date = ".concat(stockobject.entry_date, "\n");
    let line9 = ":teacher: Suggested By = ".concat(stockobject.suggested_by, "\n");
    let line10 = ":necktie: Added By = @".concat(stockobject.added_by, "\n");
    let line11 = ":notepad_spiral: Notes = ".concat(stockobject.note, "\n");
    let line12 = ":game_die: Status = ".concat(stockobject.status, "\n");
    resp = resp.concat(line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11,line12, "\n");
    return resp;
}

async function formatStockBreif(stockobject) {
    let resp = "";
    let line1 = ":hash: sln = ".concat(stockobject.sln, "\n");
    let line2 = ":tickets: Ticker = **".concat(stockobject.ticker.toUpperCase(), "** ("+stockobject.company+")\n");
    let line3 = ":boomerang: Entry Limit= ".concat(stockobject.entry_limit, "\n");
    let line4 = ":dart: Target Price= ".concat(stockobject.target_price, "\n");
    resp = resp.concat(line1, line2, line3, line4, "\n");
    return resp;
}

async function formatStockList(stocklist) {
    let entries = [];
    stocklist.forEach(e =>{
        let entry = {
            SLN: e.sln,
            TICKER: e.ticker,
            ENTRY: e.entry_limit,
            TARGET: e.target_price,
            CURRENT: e.current_price 
        }
        entries.push(entry)
    });
    var resp= await stringTable.create(entries);
    return resp;
}


module.exports.getStocks = getStocks;
module.exports.appendStock = appendStock;
module.exports.editStock = editStock;
module.exports.deleteStock = deleteStock;
module.exports.formatStockDetail = formatStockDetail;
module.exports.formatStockBreif = formatStockBreif;
module.exports.formatStockList = formatStockList;
module.exports.getNumberOfStocks = getNumberOfStocks;


