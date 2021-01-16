const express = require('express');
const router = require('./router');

const ajax = require('./public/ajax');

let app = express();

app.set('view engine', 'hbs');
app.use(express.static("public"));


app.listen(80, () => {
    console.log("Server started and listen on Port 80" );
});


app.get('/', router.start);

app.get('/search', router.search);

app.get('/show', router.show);

app.get('/error', router.error);
