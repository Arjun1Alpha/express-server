const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const app = express();
dotenv.config({});

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
