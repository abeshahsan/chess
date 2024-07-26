const express = require('express');
const { findUser, insertUser, getAllUsers } = require('../database/data-fetch');

var router = express.Router();

/* GET home page. */
router.post('/login', async (req, res, next) => {
    let { data } = await findUser(req.body.email, req.body.password);

    let user = data[0];

    // console.log(user);

    req.session.user = user

    return res.send({
        status: user ? 1 : 0,
        user: user
    });
});

router.post('/register', async (req, res, next) => {
    try {
        let { data: queryResult } = await findUser(req.body.email);

        let user;

        if (queryResult && queryResult.length) { //user already registered
            user = queryResult[0];
            req.session.user = user;
            return res.send({
                status: 2,
            });
        }

        try {
            await insertUser({
                email: req.body.email,
                name: req.body.name,
                picture: req.body.picture,
            });
            req.session.user = user;

        } catch (error) {
            throw new Error(error);
        }


        return res.send({
            status: 1,
        });
    } catch (err) {
        console.log(err);
        return res.send({
            error: err.message,
            status: 0,
        });
    }
});

router.get('/current-user', function (req, res, next) {
    return res.send({
        user: req.session.user
    });
});

router.get('/get-all-users', async (req, res, next) => {

    try {
        let users = await getAllUsers();

        // console.log(users);

        return res.send({
            users: users
        });
    } catch (error) {
        console.log(error);
        return res.send({
            error: error.message,
            status: 0,
        });
    }
});



router.post('/logout', function (req, res, next) {

    req.session.user = undefined

    return res.send({
        message: "logged out"
    });
});



router.post('*', async (req, res, next) => {
    let { data: queryResult } = await findUser(req.body.email);

    let user = queryResult[0];

    req.session.user = user

    return res.send({
        status: "no url",
    });
});

module.exports = router;
