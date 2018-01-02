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
router.get('/users', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .find()
            .toArray()
            .then((users) => {
                console.log("hello im checking users for login");
                response.data = users;
                res.json(users);
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
    console.log("START==============");
    console.log(req);
    console.log("END=====================");
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
                console.log(sections);
                //var user_sections = [];
                console.log("hi");
                /*for(var x=0 ; x< sections.length ; x++){
                    console.log('x: '+x);
                    let students = sections[x].students;

                    for(var y=0; y<students.length; y++){
                        console.log('y: '+y);
                        let student = students[y];
                        console.log(student);
                        console.log(req.query.id);
                        if(student.user_id == req.query.id){
                            user_sections.push(sections[x]);                            
                            break;                
                        }
                    }
                    
                }*/
                response.data = sections;
                res.json(sections);

            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


module.exports = router;