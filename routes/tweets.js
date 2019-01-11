const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const tweets = require('../data/tweets');

/* GET users listing. */
router.get('/:user/tweets', function(req, res) {
    tweets.getAll(req.token)
        .then(
            (data) => res.send(data),
            (error) => {
                console.error(error);
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
        )
});

router.post('/:user/tweet', bodyParser.json(), (req, res) => {
    tweets.add(req.token, req.body)
        .then(
            (data) => res.send(data),
            (error) => {
                console.error(error)
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
        )
});

router.delete('/tweet/:id', (req, res) => {
    tweets.disable(req.token, req.params.id)
        .then(post => comments.disableByParent(req.token, post))
        .then(
            (data) => res.send(data),
            (error) => {
                console.error(error);
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
        )
});

router.put('/posts/:id', bodyParser.json(), (req, res) => {
    tweets.edit(req.token, req.params.id, req.body)
        .then(
            (data) => res.send(data),
            (error) => {
                console.error(error)
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
        )
});

module.exports = router;