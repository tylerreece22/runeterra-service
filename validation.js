const Joi = require('@hapi/joi');

module.exports.deckDecodeValidation = Joi.object({
    deckCode: Joi.string().required()
})

module.exports.deckEncodeValidation = Joi.object({
    deck: Joi.array().required()
})

module.exports.cardDetailsValidation = Joi.object({
    cardCode: Joi.string().length(7).required()
})
