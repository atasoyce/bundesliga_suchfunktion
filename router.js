const databaseManager = require('./databaseManager');

function start(req, res) {
    res.render('index');
}

exports.start = start;

function error(req, res) {
    res.render('error');
}

exports.error = error;

function search(req, res) {
    let result = "";
    let rowString = req.query.items;

    databaseManager.sucheVereine(rowString)
        .then(row => {
            for(let i = 0; i < row.length; i++) {
                result += `<li class="myLi" onclick="showPlayers('${row[i].Name}')">${row[i].Name}</li>`;
            }
            res.send(result);
        })
        .catch(() => {
            res.render('error')
        });
}

exports.search = search;

function show(req, res) {
    let player = "";
    let club = "";
    let ueberschriften = "";

    let rowString = req.query.items;
    databaseManager.sucheSpieler(rowString)
        .then(row =>{
            ueberschriften +=
                '<tr>' +
                    '<th>' +  "Spielername" + '</th>' +
                    '<th>' +  "Trikot-Nummer" + '</th>' +
                    '<th>' +  "Staatsbürgerschaft" + '</th>' +
                    '<th>' +  "Anzahl der Tore" + '</th>' +
                    '<th>' +  "Anzahl der Vorlagen" + '</th>' +
                '</tr>';

            club += '<h2>' + rowString + '</h2>';
            for (let i = 0; i < row.length; i++) {
                player += '<tr>' +
                            '<td>' + row[i].Spieler_Name + '</td>' +
                            '<td>' + row[i].Trikot_Nr + '</td>' +
                            '<td>' + row[i].Land + '</td>' +
                            '<td>' + row[i].Tore + '</td>' +
                            '<td>' + row[i].Vorlagen + '</td>' +
                        '</tr>';
            }
            res.send(club + ueberschriften + player);
        })
        .catch(() => {
            res.render('error')
        });
}

exports.show = show;