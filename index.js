const express = require('express');
const app = express();
const api = require('./controller/router');

// middleware
app.use(express.static('public'));
app.use('/api' , api);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.listen(5000, () => console.log('Server has been started port 5000'));