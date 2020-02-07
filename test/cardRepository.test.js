const should = require('should')
const cardRepository = require('../cardRepository')
const expectedCard = require('./resource/expectedCard')
const allCards = require('../set1-en_us')

describe('cardRepository', () => {
    it('should return correct card with cardCode', () => {
        const card = cardRepository.get('01PZ019')

        should(card).deepEqual(expectedCard)
    });

    it('should return all cards cardCode not passed', () => {
        const cards = cardRepository.get()

        should(cards).deepEqual(allCards)
    });

    it('should throw 404 not found if the cardCode does not exist', () => {
        let error
        try {
            cardRepository.get('0101011')
        } catch (e) {
            error = e
        }

        should(error.statusCode).eql(404)
        should(error.message).eql('cardCode 0101011 does not exist')
    });
})