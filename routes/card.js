const express = require('express');
const router = express.Router();
const {cardDetailsValidation} = require('../validation')
const {get} = require('../cardRepository')

router.get('/details', async (req, res) => {
    const {error} = cardDetailsValidation.validate(req.query)
    if (error) return res.status(400).send(error.details[0].message)

    let card
    try {
        card = get(req.query.cardCode)
    } catch (e) {
        return res.status(e.statusCode || 500).send(e.message || 'Something bad happened :(')
    }
    return res.status(200).send(card)
});

module.exports = router
