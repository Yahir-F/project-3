const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '10mb'}));



app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.use(routes);
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}!`);
  });
});
