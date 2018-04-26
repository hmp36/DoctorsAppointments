const users = require('./../controllers/users.js');
const bucketlists = require('./../controllers/bucketlists.js');
const path = require('path');
module.exports = function (app) {

    app.post('/api/user/login', users.login);
    app.get('/api/user/check', users.check);
    app.get('/api/user/logout', users.logout);
    app.get('/api/bucketlists', bucketlists.getAll);
    app.post('/api/bucketlists', bucketlists.add)
    app.delete('/api/bucketlists/:id', bucketlists.delete);

    app.all("*", (req, res, next) => {
        res.sendfile(path.resolve("./client/dist/index.html"));
    })

};