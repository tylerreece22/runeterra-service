const express = require('express');
const app = express();
const cors = require('cors');
const deck = require('./routes/deck')
const card = require('./routes/card')
const log = require('./logger')
const swaggerUi = require('swagger-ui-express');
const {options, swaggerDocument} = require('./swagger')

app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/deck', deck);
app.use('/card', card);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
    log.info(`Listening on ${port}`)
});
