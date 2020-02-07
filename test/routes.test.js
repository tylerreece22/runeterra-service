const should = require('should')
const request = require('supertest')
const expectedCard = require('./resource/expectedCard')

describe('routes', () => {
    process.env.PORT = 3333

    describe('/deck', () => {
        let req, server

        beforeEach(() => {
            server = require('../index')
        })

        afterEach(() => {
            server.close()
        })

        describe('/encode', () => {
            it('should send 200 if deck valid', async () => {
                const result = await request(server)
                    .post('/deck/encode')
                    .send({
                        "deck": [
                            {
                                "code": "01PZ019",
                                "count": 2,
                                "set": 1,
                                "id": 19,
                                "faction": {
                                    "id": 4,
                                    "shortCode": "PZ"
                                }
                            }
                        ]
                    })

                should(result.status).eql(200)
                should(result.text).eql("CEAACAIBAQJQA");
            })

            it('should send 400 with message if deck is not in body', async () => {
                const result = await request(server).post('/deck/encode')

                should(result.status).eql(400)
                should(result.text).eql('"deck" is required')
            });

            it('should send 400 with message if the deck is invalid', async () => {
                const result = await request(server)
                    .post('/deck/encode')
                    .send({
                        "deck": [
                            {
                                "code": "01PZ019",
                                "count": 2,
                            }
                        ]
                    })

                should(result.status).eql(400)
                should(result.text).eql('The deck provided contains invalid card codes')
            });
        })

        describe('/decode', () => {
            it('should send 400 with message if deckCode is not in params', async () => {
                const result = await request(server).get('/deck/decode')

                should(result.status).eql(400)
                should(result.text).eql('"deckCode" is required')
            });

            it('should send 400 with message if the deckCode is invalid', async () => {
                const result = await request(server)
                    .get('/deck/decode?deckCode=123')

                should(result.status).eql(400)
                should(result.text).eql('Invalid deck code')
            });

            it('should send 200 if the deckCode valid', async () => {
                const result = await request(server)
                    .get('/deck/decode?deckCode=CEAACAIBAQJQA')

                should(result.status).eql(200)
                should(result.body).deepEqual([{
                    "code": "01PZ019",
                    "count": 2
                }])
            });
        })
    })

    describe('/card', () => {
        let req, server

        beforeEach(() => {
            server = require('../index')
            req = {}
        })

        afterEach(() => {
            server.close()
        })

        describe('/details', () => {
            it('should send 200 if request is valid', async () => {
                const result = await request(server)
                    .get('/card/details?cardCode=01PZ019')

                should(result.status).eql(200)
                should(result.body).deepEqual(expectedCard);
            })

            it('should send 400 with message if cardCode is not in params', async () => {
                const result = await request(server).get('/card/details')

                should(result.status).eql(400)
                should(result.text).eql('"cardCode" is required')
            });

            it('should send 404 with message if cardCode is not a real card', async () => {
                const result = await request(server).get('/card/details?cardCode=0101011')

                should(result.status).eql(404)
                should(result.text).eql('cardCode 0101011 does not exist')
            });
        })
    })
})
