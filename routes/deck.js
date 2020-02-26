const { DeckEncoder } = require('runeterra')
const express = require('express');
const router = express.Router();
const {deckDecodeValidation, deckEncodeValidation} = require('../validation')
const log = require('../logger')

// router.get('/decode', async (req, res) => {
//     const {error} = deckDecodeValidation.validate(req.query)
//     if (error) return res.status(400).send(error.details[0].message)
//
//     let deck
//     try {
//         deck = DeckEncoder.decode(req.query.deckCode)
//     } catch (e) {
//         log.error(`StatusCode: ${e.statusCode || 500} -- Message: ${e.message || 'Something bad happened :('}`)
//         return res.status(400).send(e.message)
//     }
//     log.info(`Successfully decoded deck`)
//     return res.status(200).send(deck)
// });

router.post('/encode', async (req, res) => {
    const {error} = deckEncodeValidation.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const deck = req.body.deck
    let code
    try {
        code = DeckEncoder.encode(deck)
    } catch (e) {
        log.info(`StatusCode: ${e.statusCode || 500} -- Message: ${e.message || 'Something bad happened :('} -- Request body: ${JSON.stringify(req.body)}`)
        return res.status(400).send(e.message)
    }
    log.info(`Successfully encoded deck`)
    return res.status(200).send(code)
});

module.exports = router