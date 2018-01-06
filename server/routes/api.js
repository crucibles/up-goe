const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/up-goe-db', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Log-in
router.get('/login', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .find({
                user_email: req.query.user_email,
                user_password: req.query.user_password
            })
            .toArray()
            .then((users) => {
                response.data = users[0];
                res.json(users[0]);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(users);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get courses
router.get('/courses', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('courses')
            .find()
            .toArray()
            .then((courses) => {
                response.data = courses;
                res.json(courses);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get sections of user
router.get('/sections', (req, res) => {

    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('sections')
            .find({
                students: {
                    $elemMatch: {
                        user_id: req.query.id
                    }
                }
            })
            .toArray()
            .then((sections) => {
                response.data = sections;
                res.json(sections);

            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Store new user to databse
router.post('/signup', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        var myObj = {
            user_fname: req.body.firstName,
            user_mname: req.body.middleName,
            user_lname: req.body.lastName,
            user_birthdate: req.body.birthdate,
            user_email: req.body.email,
            user_password: req.body.password,
            user_type: req.body.type,
            user_contact_no: req.body.contactNumber,
            user_security_question: req.body.securityQuestion,
            user_security_answer: req.body.securityAnswer
        };

        myDB.collection('users').insertOne(myObj, function (err, res) {
            if (err) {
                console.log(err);
                throw err;
            }
        });

        myDB.collection('users').find().toArray().then(() => {
            response.data = myObj;
            res.json(myObj);
        });
    });
});


module.exports = router;