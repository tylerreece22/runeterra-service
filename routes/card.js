const express = require('express');
const router = express.Router();
const {cardDetailsValidation} = require('../validation')
const {get} = require('../cardRepository')
const log = require('../logger')

router.get('/details', async (req, res) => {
    const {error} = cardDetailsValidation.validate(req.query)
    if (error) return res.status(400).send(error.details[0].message)

    let card
    try {
        card = get(req.query.cardCode)
    } catch (e) {
        log.error(`StatusCode: ${e.statusCode || 500} -- Message: ${e.message || 'Something bad happened :('}`)
        return res.status(e.statusCode || 500).send(e.message || 'Something bad happened :(')
    }
    log.info(`Successfully got card(s)`)
    return res.status(200).send(card)
});

module.exports = router
