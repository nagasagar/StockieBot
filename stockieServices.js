const googleSheetApi = require('./GoogleSheetApi');
const servicehelper = require('./servicehelpers');
const stringTable = require('string-table');

const STOCKIE_PREFIX = process.env.STOCKIE_PREFIX;
const WATCHIE_PREFIX = process.env.WATCHIE_PREFIX;

async function getStocks(msg) {
    const content = msg.content;
    const parts = content.split(' ');
    if (parts[0] === STOCKIE_PREFIX) {
        const rawData = await googleSheetApi.getValues(process.env.POSITIONS_SPREADSHEET_TAB);
        const stocks = await servicehelper.parseList(rawData);
        return stocks;
    }else if (parts[0] === WATCHIE_PREFIX) {
        const rawData = await googleSheetApi.getValues(process.env.WATCHLIST_SPREADSHEET_TAB);
        const stocks = await servicehelper.parseList(rawData);
        return stocks;
    } else {
        return;
    }
    
}
async function getNumberOfStocks(msg) {
    const content = msg.content;
    const parts = content.split(' ');
    if (parts[0] === STOCKIE_PREFIX) {
        const numberOfStocks = await googleSheetApi.getNumberOfRows(process.env.POSITIONS_SPREADSHEET_TAB);
        return numberOfStocks-1;
    }else if (parts[0] === WATCHIE_PREFIX) {
        const numberOfStocks = await googleSheetApi.getNumberOfRows(process.env.WATCHLIST_SPREADSHEET_TAB);
        return numberOfStocks-1;
    } else {
        return;
    }
    
}


async function appendStock(msg, jsonObject) {
    const content = msg.content;
    const parts = content.split(' ');
    if (parts[0] === STOCKIE_PREFIX) {
        const appendRow = await servicehelper.buildRow(jsonObject);
        return googleSheetApi.appendRow(process.env.POSITIONS_SPREADSHEET_TAB, appendRow);
    }else if (parts[0] === WATCHIE_PREFIX) {
        const appendRow = await servicehelper.buildRow(jsonObject);
        return googleSheetApi.appendRow(process.env.WATCHLIST_SPREADSHEET_TAB, appendRow);
    } else {
        return;
    }
}

async function editStock(msg, jsonObject) {
    const content = msg.content;
    const parts = content.split(' ');
    if (parts[0] === STOCKIE_PREFIX) {
        const appendRow = await servicehelper.buildRow(jsonObject);
        return googleSheetApi.editRow(process.env.POSITIONS_SPREADSHEET_TAB,parseInt(jsonObject.sln)+1, appendRow);
    }else if (parts[0] === WATCHIE_PREFIX) {
        const appendRow = await servicehelper.buildRow(jsonObject);
        return googleSheetApi.editRow(process.env.WATCHLIST_SPREADSHEET_TAB,parseInt(jsonObject.sln)+1, appendRow);
    } else {
        return;
    }

}

async function deleteStock(msg, jsonObject) {
    const content = msg.content;
    const parts = content.split(' ');
    if (parts[0] === STOCKIE_PREFIX) {
        return googleSheetApi.deleteRow(process.env.POSITIONS_SPREADSHEET_GID, parseInt(jsonObject.sln));
    }else if (parts[0] === WATCHIE_PREFIX) {
        return googleSheetApi.deleteRow(process.env.WATCHLIST_SPREADSHEET_GID, parseInt(jsonObject.sln));
    } else {
        return;
    }
}

async function formatStockDetail(msg, stockobject) {
    const content = msg.content;
    const parts = content.split(' ');
    let resp = "";
    if (parts[0] === STOCKIE_PREFIX) {
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
    }else if (parts[0] === WATCHIE_PREFIX) {
        let line1 = ":watch: sln = ".concat(stockobject.sln, "\n");
        let line2 = ":watch: Ticker = **".concat(stockobject.ticker.toUpperCase(), "** ("+stockobject.company+")\n");
        let line3 = ":watch: Entry Limit= ".concat(stockobject.entry_limit, "\n");
        let line4 = ":watch: Target Price= ".concat(stockobject.target_price, "\n");
        let line5 = ":watch: Current Price= ".concat(stockobject.current_price, "\n");
        let line6 = ":watch: Gap To Target = ".concat(stockobject.gapto_target, "\n");
        let line7 = ":watch: Gap To Target in % = ".concat(stockobject.gapto_target_percentage, "%\n");
        let line8 = ":watch: Entry Date = ".concat(stockobject.entry_date, "\n");
        let line9 = ":watch: Suggested By = ".concat(stockobject.suggested_by, "\n");
        let line10 = ":watch: Added By = @".concat(stockobject.added_by, "\n");
        let line11 = ":watch: Notes = ".concat(stockobject.note, "\n");
        let line12 = ":watch: Status = ".concat(stockobject.status, "\n");
        resp = resp.concat(line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11,line12, "\n");
    } else {
        return;
    }  
    return resp;
}

async function formatStockBreif(msg, stockobject) {
    const content = msg.content;
    const parts = content.split(' ');
    let resp = "";
    if (parts[0] === STOCKIE_PREFIX) {
        let resp = "";
        let line1 = ":hash: sln = ".concat(stockobject.sln, "\n");
        let line2 = ":tickets: Ticker = **".concat(stockobject.ticker.toUpperCase(), "** ("+stockobject.company+")\n");
        let line3 = ":boomerang: Entry Limit= ".concat(stockobject.entry_limit, "\n");
        let line4 = ":dart: Target Price= ".concat(stockobject.target_price, "\n");
        resp = resp.concat(line1, line2, line3, line4, "\n");
    }else if (parts[0] === WATCHIE_PREFIX) {
        let resp = "";
        let line1 = ":watch: sln = ".concat(stockobject.sln, "\n");
        let line2 = ":watch: Ticker = **".concat(stockobject.ticker.toUpperCase(), "** ("+stockobject.company+")\n");
        let line3 = ":watch: Entry Limit= ".concat(stockobject.entry_limit, "\n");
        let line4 = ":watch: Target Price= ".concat(stockobject.target_price, "\n");
        resp = resp.concat(line1, line2, line3, line4, "\n");
    } else {
        return;
    }
    return resp;
}

async function formatStockList(msg, stocklist) {
    const content = msg.content;
    const parts = content.split(' ');
    let entries = [];
    if (parts[0] === STOCKIE_PREFIX) {
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
    }else if (parts[0] === WATCHIE_PREFIX) {
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
    } else {
        return;
    }
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


