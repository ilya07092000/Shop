const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const err404 = require('./controllers/404.js')

const sequelize = require('./util/database.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(err404.err404);

const server = http.createServer(app);

sequelize
    .sync()
    .then(result => {
        // console.log(result);
        server.listen(3000);
    })
    .catch(err => console.log(err));
