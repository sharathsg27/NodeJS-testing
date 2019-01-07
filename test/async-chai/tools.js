const https = require('https');

function loadWiki(name, callback) {
    if (name.first && name.last) {
        let url = `https://en.wikipedia.org/wiki/${name.first}/${name.last}`;
        https.get(url, (res) => {
            let body = "";

            // Set encoding format
            res.setEncoding('UTF-8');

            // When data is recieved as chunk
            res.on('data', (chunk) => {
                body += chunk;
            });

            // When the response data ends, the body (data) is passed is the callback
            res.on('end', () => {
                callback(body);
            })
        });
    }
}

module.exports = {
    loadWiki: loadWiki
}