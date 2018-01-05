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

// api/login
router.get('/login', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .findOne({
                user_email: req.query.user_email,
                user_password: req.query.user_password
            })
            .then((user) => {
                user.user_password = '';
                console.log(user);
                response.data = user;
                res.json(user);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// api/users
router.get('/users', (req, res) => {
    console.log(req);
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .find(
                ObjectID(req.query.id)
            )
            .toArray()
            .then((users) => {
                console.log(users);
                response.data = users;
                res.json(users);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// api/courses
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






// api/sections
router.get('/sections', (req, res) => {
    
    connection((db) => {
        const myDB = db.db('up-goe-db');

        if (req.query.method == "getUserSections") {
            myDB.collection('sections')
            .find({

                students: { 
                    $elemMatch: {
                        status: "E",
                        user_id: req.query.id
                    }                    
                }      

            })
            .toArray()
            .then((sections) => {
                response.data = sections;
                res = res.json(sections);
                
            })
            .catch((err) => {
                sendError(err, res);
            });
            
        } else if(req.query.method == "getUserSectionQuests"){
            console.log("hi");
            myDB.collection('sections')
            .find({

                students: { 
                    $elemMatch: {
                        status: "E",
                        user_id: req.query.id
                    }                    
                }              
                         
            })
            .toArray()
            .then((quests) => {
                let userquests = quests.map(a => a.quests);
                console.log(userquests);
                response.data = quests;
                res = res.json(quests);
                
            })
            .catch((err) => {
                sendError(err, res);
            });
        }
        


    });

});

// api/quests
router.get('/quests', (req, res) => {
    
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('quests')
            .find()
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


module.exports = router;