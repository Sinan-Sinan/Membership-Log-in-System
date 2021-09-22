const express = require('express');
const router = express.Router();
const { google } = require("googleapis");
const { GoogleAuth } = require('google-auth-library');

router.get('/ids', async (req, res) => {

    const auth = new GoogleAuth({
        keyFile: "./keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });

    const authClientObject = await auth.getClient();
    
    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    
    //https://docs.google.com/spreadsheets/d/13e6z_qdmzqgwdU7KjMD92a5q1aGMo7ikzXbriJG5X74/edit?usp=sharing
    
    const spreadsheetId = "13e6z_qdmzqgwdU7KjMD92a5q1aGMo7ikzXbriJG5X74";

    const sheetInfo = await googleSheetsInstance.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //Read from the spreadsheet
    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: "Sheet1!C:C", //range of cells to read from.
    })
    
    return res.json(readData.data)
})

router.get('/userinfo/:pos', async (req, res) => {

    const { pos } = req.params; 
    const auth = new GoogleAuth({
        keyFile: "./keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });

    const authClientObject = await auth.getClient();
    
    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    
    //https://docs.google.com/spreadsheets/d/13e6z_qdmzqgwdU7KjMD92a5q1aGMo7ikzXbriJG5X74/edit?usp=sharing
    
    const spreadsheetId = "13e6z_qdmzqgwdU7KjMD92a5q1aGMo7ikzXbriJG5X74";

    const sheetInfo = await googleSheetsInstance.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //Read from the spreadsheet
    const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: `Sheet1!${pos}:${pos}`, //range of cells to read from.
    })
    
    return res.json(readData.data)
})

router.post('/sendLog/:name/:num/:role/:valid/:date/:log', async (req, res) => {

    const { name, num, role, valid, log, date } = req.params; 
    const auth = new GoogleAuth({
        keyFile: "./keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    });

    const authClientObject = await auth.getClient();
    
    //Google sheets instance
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    
    //https://docs.google.com/spreadsheets/d/13e6z_qdmzqgwdU7KjMD92a5q1aGMo7ikzXbriJG5X74/edit?usp=sharing
    //https://docs.google.com/spreadsheets/d/1jFkp-VJTtBfM3A-22dR1paQWSAnAlUjjSeipQe4sM3Y/edit?usp=sharing
    
    const spreadsheetId = "1jFkp-VJTtBfM3A-22dR1paQWSAnAlUjjSeipQe4sM3Y";

    const sheetInfo = await googleSheetsInstance.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //Read from the spreadsheet
    await googleSheetsInstance.spreadsheets.values.append({
        auth, //auth object
        spreadsheetId, //spreadsheet id
        range: "Sheet1!A:E", //sheet name and range of cells
        valueInputOption: "USER_ENTERED",// The information will be passed according to what the usere passes in as date, number or text 
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [[name, num, role, valid, log, date ]],
        },
    });

    res.send("Log Ingested")
})

module.exports = router;