const cards = require('./set1-en_us')
const StandardError = require('./StandardError')

module.exports.get = (cardCode) => {
    if (!cardCode) return cards

    const card = cards.find(card => card.cardCode === cardCode)
    if (!card) throw new StandardError(404, `cardCode ${cardCode} does not exist`)
    return card
}