const express = require('express');
const app = express();
const cors = require('cors');
const deck = require('./routes/deck')
const card = require('./routes/card')
const log = require('./logger')
const swaggerUi = require('swagger-ui-express');
const {options, swaggerDocument} = require('./swagger')
const rateLimit = require("express-rate-limit");

app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(cors(corsOptions))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/deck', deck);
// app.use('/card', card);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
    log.info(`Listening on ${port}`)
});
