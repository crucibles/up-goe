const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const async = require('async');
/*
*
*/
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

// to be edited for functions regarding requests for courses
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

/*
** api/login
** Created by Cedric Alvaro
** 11 Jan 2018 - At latest by Donevir Hynson
*/
router.post('/login', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .findOne({
                user_email: req.body.user_email,
                user_password: req.body.user_password
            })
            .then((user) => {
                if(user) {
                    user.user_password = '';
                    response.data = user;
                    res.json(user);
                } else {
                    res.json(false);
                }
                
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// api/quests
router.get('/quests', (req, res) => {

    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('quests')
            .find()
            .toArray()
            .then((quests) => {
                response.data = quests;
                res.json(quests);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

});

// haven't implemented fully the logic yet to search and sort.
// api/commentposts
router.get('/posts', (req, res) => {
    var myObjArr = [];

    connection((db) => {
        const myDB = db.db('up-goe-db');

        myDB.collection('posts')
            .find()
            .toArray()
            .then((posts) => {
                response.data = posts;
                res.json(posts);
            })
            .catch((err) => {
                sendError(err, res);
            })

    });

});

// api/sections/search
router.get('/search', (req, res) => {
    var myObjArr = [];

    connection((db) => {
        const myDB = db.db('up-goe-db');

        myDB.collection('sections')
            .find(ObjectID(req.query.class))
            .toArray()
            .then((sections) => {
                var myObjArr = [];
                var myObj = {};

                async.forEach(sections, processEachSection, afterAllSection);

                function processEachSection(section, callback) {
                    myDB.collection('courses')
                        .find(ObjectID(section.course_id))
                        .toArray()
                        .then((course) => {
                            myObj["section"] = section;
                            myObj["course_name"] = course[0].course_name;
                            myObjArr.push(myObj);
                            callback();
                        }, reason => {
                            callback(reason);
                        })

                }

                function afterAllSection(err) {
                    response.data = myObjArr;
                    res.json(myObjArr);
                }


            })
            .catch((err) => {
                sendError(err, res);
            })

    });

});

// api/sections
router.get('/sections', (req, res) => {
    var myObjArr = [];

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

                async.forEach(sections, processEachSection, afterAllSection);

                function processEachSection(section, callback) {

                    myDB.collection('courses')
                        .find(ObjectID(section.course_id))
                        .toArray()
                        .then((course) => {
                            Promise.all(course[0].course_name).then(() => {
                                myObjArr.push({
                                    section: section,
                                    course_name: course[0].course_name
                                });
                                callback(null);
                            });
                        });

                }

                function afterAllSection(err) {
                    response.data = myObjArr;
                    res.send(myObjArr);
                }


            })
            .catch((err) => {
                sendError(err, res);
            })

    });

});

//  api/sections/quests
router.get('/sections/quests', (req, res) => {

    connection((db) => {
        const myDB = db.db('up-goe-db');

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

                if (req.query.method) {
                    let questsOnly = sections.map(section => section.quests);
                    let userQuests = [];

                    questsOnly.forEach(quests => {
                        quests.forEach(quest => {
                            if (quest.quest_participants == req.query.id) {
                                userQuests.push(quest.quest_id);
                            }
                        })
                    });

                    myDB.collection('quests')
                        .find()
                        .toArray()
                        .then((quests) => {

                            let AllUserQuests = [];
                            quests.forEach(quest => {
                                userQuests.forEach(userQuest => {
                                    if (quest._id == userQuest) {
                                        AllUserQuests.push(quest);
                                    }
                                })
                            })

                            response.data = AllUserQuests;
                            res = res.json(AllUserQuests);
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });

                } else {
                    response.data = sections;
                    res = res.json(sections);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

});

/*
** api/signup
** Created by: Donevir Hynson
*/
router.post('/signup', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        var newUserObj = {
            user_school_id: req.body.schoolId,
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

        myDB.collection('users')
            // Counts the number of returned results from query
            .count({
                user_email: newUserObj.user_email
            })
            .then((count) => {
                // If count returns true (>=1), then user email already exists
                if(count) {
                    console.log("Duplicate email detected: " + newUserObj.user_email);
                    response.data = newUserObj.user_email;
                    // Returns false to signal that user already exists
                    res.json(false);
                } else {
                    // If count returns false (=0), inserts new user to database
                    myDB.collection('users')
                        .insertOne(newUserObj, function (err, result) {
                            if (err) {
                                console.log(err);
                                response.message = err;
                                throw err;
                            }
                            response.data = newUserObj;
                            res.json(result);
                        });
                }
            })
            .catch((err) => {
                sendError(err, res);
            })
    });
});

// api/users
router.get('/users', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .find(
                ObjectID(req.query.id)
            )
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

/**
 * api/securityQuestions
 * Create by: Donevir Hynson
 */
router.get('/securityQuestions', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('questions')
            .find()
            .toArray()
            .then((questions) => {
                q = questions[0].question;
                response.data = questions[0].question;
                res.json(questions);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;