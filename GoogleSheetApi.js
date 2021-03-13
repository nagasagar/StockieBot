const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const sheets = google.sheets('v4');


const getRequestParameters = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  majorDimension: 'ROWS'
}
const appendRequestParameters = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  valueInputOption: 'USER_ENTERED',
  insertDataOption: 'INSERT_ROWS'
}
const editRequestParameters = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  valueInputOption: 'USER_ENTERED'
}
const deleteRequestParameters = {
  spreadsheetId: process.env.SPREADSHEET_ID
}

async function authorize() {
  return new JWT({
    email: process.env.GOOGLE_API_CLIENT_EMAIL,
    key: process.env.GOOGLE_API_PRIVATE_KEY.replace(new RegExp('\\\\n', '\g'), '\n'),
    scopes: scopes
  });
}

async function getValues(spreadsheetTabname) {
  try {
    const request = getRequestParameters;
    const authorization = await authorize();
    request.auth = authorization;
    request.range = spreadsheetTabname;
    const response = await sheets.spreadsheets.values.get(request);
    return response.data.values;
  }
  catch (error) {
    console.log(error)
  }
}

async function appendRow(spreadsheetTabname, newRow) {
  const request = appendRequestParameters;
  const authorization = await authorize();
  appendRequestParameters.auth = authorization;
  appendRequestParameters.range = spreadsheetTabname;
  request['resource'] = { "values": [newRow] };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    return response.data;
  }
  catch (error) {
    console.log(error)
  }
}


async function editRow(spreadsheetTabname, rowIndex, updatedRow) {
  try {
    const request = editRequestParameters;
    const authorization = await authorize();
    request.auth = authorization;
    request.range = spreadsheetTabname + "!" + rowIndex + ":" + rowIndex;
    request['resource'] = { "values": [updatedRow] };
    const response = await sheets.spreadsheets.values.update(getRerequestquestParameters);
    return response.data;
  }
  catch (error) {
    console.log(error)
  }
}

async function deleteRow(spreadsheetTabGid, rowIndex) {
  try {
    const request = deleteRequestParameters;
    const authorization = await authorize();
    request.auth = authorization;
    request['resource'] = {
      "requests": [{
        "deleteRange": {
          "range":
          {
            "sheetId": spreadsheetTabGid, // gid
            "startRowIndex": rowIndex,
            "endRowIndex": rowIndex + 1
          }, "shiftDimension": "ROWS"
        }
      }
      ]
    }
    const response = await sheets.spreadsheets.batchUpdate(request);
    return response.data.values;
  }
  catch (error) {
    console.log(error)
  }
}

async function getNumberOfRows(spreadsheetTabname) {
  try {
    const request = getRequestParameters;
    const authorization = await authorize();
    request.auth = authorization;
    request.range = spreadsheetTabname;
    const response = await sheets.spreadsheets.values.get(request).execute().get('values', []);
    return len(rows);
  }
  catch (error) {
    console.log(error)
  }
}

module.exports.getValues = getValues;
module.exports.appendRow = appendRow;
module.exports.editRow = editRow;
module.exports.deleteRow = deleteRow;
module.exports.getNumberOfRows = getNumberOfRows;
