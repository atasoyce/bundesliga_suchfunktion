const mysql = require('mysql2/promise');

const database = {
    host: 'localhost',
    database: 'bundesliga',
    user: 'Cemile',
    password: 'newPassword',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};


let sucheVereine = (searchedText) => {
    return new Promise((resolve, reject) => {
        mysql.createConnection(database)
            .then(conn => {
                conn.query(`SELECT Name FROM Verein WHERE Name LIKE '%${searchedText}%'`)
                    .then(result =>{

                        if (searchedText !== null){
                            let rows = result[0];

                            console.log(rows);
                            resolve(rows);
                        }
                        else {
                            reject('ERROR im databaseManager. Daten konnten nicht aus der Datenbank ausgelesen werden.')
                        }
                    })
            })
    })
        .catch(() =>{
            console.log('Connection to the database failed');
        })
};



let sucheSpieler = (searchedText) => {
    return new Promise((resolve, reject) => {
        mysql.createConnection(database)
            .then(conn => {
                conn.query(`SELECT distinct Spieler.Spieler_Name, Spieler.Trikot_Nr, Spieler.Land, Spieler.Tore, Spieler.Vorlagen FROM Spieler INNER JOIN Verein ON Spieler.Vereins_ID = Verein.V_ID WHERE Verein.Name LIKE '${searchedText}' ORDER BY Spieler.Spieler_Name`)
                    .then(result =>{


                        if (searchedText !== null){
                            let rows = result[0];

                            console.log(rows);
                            resolve(rows);
                        }
                        else {
                            reject('ERROR im databaseManager. Daten konnten nicht aus der Datenbank ausgelesen werden.')
                        }
                    })
            })
    })
        .catch(() =>{
            console.log('Connection to the database failed');
        })
};

exports.sucheVereine = sucheVereine;
exports.sucheSpieler = sucheSpieler;