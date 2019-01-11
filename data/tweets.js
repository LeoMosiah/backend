const clone = require('clone');

let db = {};

const defaultData = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        deleted: false,
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        deleted: false,
    }
};

function getData (token) {
    let data = db[token];
    if (data == null) {
        data = db[token] = clone(defaultData)
    }
    return data
}


function getAll (token) {
    return new Promise((res) => {
        const tweets = getData(token);
        let keys = Object.keys(tweets);
        let filtered_keys = keys.filter(key => !tweets[key].deleted);
        res(filtered_keys.map(key => tweets[key]))
    })
}

function add (token, tweet) {
    return new Promise((res) => {
        let tweets = getData(token);

        tweets[tweet.id] = {
            id: tweet.id,
            timestamp: tweet.timestamp,
            body: tweet.body,
            author: tweet.author,
            deleted: false,
        };

        res(tweets[tweet.id])
    })
}

function disable (token, id) {
    return new Promise((res) => {
        let tweets = getData(token)
        tweets[id].deleted = true
        res(tweets[id])
    })
}

function edit (token, id, tweet) {
    return new Promise((res) => {
        let tweets = getData(token)
        for (prop in tweet) {
            tweets[id][prop] = tweet[prop]
        }
        res(tweets[id])
    })
}


module.exports = {
    getAll,
    add,
    disable,
    edit,
};