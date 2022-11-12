require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const yaml = require('js-yaml');
const fs = require('fs')
// process.env.TZ

const dbConnectMongo = require('./config/mongo');
const { pingToUrl } = require('./utils/ScheduleJods');
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());

app.use('/', require('./routes'))



app.listen(port, () => {
  console.log(`Exposed port http://127.0.0.1:${port}`)
});

dbConnectMongo();

/**
 * Ping to web for test
 */
// pingToUrl('https://aj-derteano.github/')
// pingToUrl('https://aj-derteano.github.io/', null, true)

/**
 * read yaml
 */
let fileContent = fs.readFileSync('./config.yaml', 'utf8')
let data = yaml.load(fileContent);

/* for (const web of data.url_webs) {
  const { url, expected_code, name } = web;
  pingToUrl({ name, url, expected_code })
}

const Webs = require('./controllers/Webs')
for (const web of data.url_webs) {
  const { url, expected_code, name, description} = web;
  let dataWeb = {
    webBaseUrl: url,
    name,
    description,
    expectResponseCode: expected_code
  }
  
  Webs.createWeb(dataWeb)
} */