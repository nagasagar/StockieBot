const titleLine = 0;
const skipTopRows = 1;

async function buildRow(jsonObject) {
    const newRow = [];
    for (let key in jsonObject) {
        newRow.push(jsonObject[key]);
    }
    return newRow;
}

async function parseList(rawData) {
    const parsedList = [];
    for (let rowIndex = skipTopRows; rowIndex < rawData.length; rowIndex++) {

        let item = {};
        for (let columnIndex = 0; columnIndex < rawData[titleLine].length; columnIndex++) {
            const cell = rawData[rowIndex][columnIndex];
            // Replace "spaces" with "_" and transform all to "Lowercase"
            const cleanTitle = (rawData[titleLine][columnIndex]).replace(/ /g, "_").toLowerCase();
            item[cleanTitle] = cell || "";
        }
        parsedList.push(item);
    }
    return parsedList;
}

module.exports.buildRow = buildRow;
module.exports.parseList = parseList;