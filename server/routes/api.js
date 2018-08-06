/**
 * This is where all the request is being handled. 
 * All requests enter an api/"some string" depending on where or what api needs to be accessed.
 */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const async = require('async');
const nodemailer = require('nodemailer');
const path = require("path");
const multer = require('multer');
var requestTime;

router.use(function timeLog(req, res, next) {
    requestTime = Date.now();
    next();
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, requestTime + "." + file.originalname);
    }
});

var upload = multer({ storage: storage }).single('file');
// var upload = multer({ dest: DIR }).single('photo');


/**
 * Note: queries are string, body can be object because of bodyParsers;

/**
 * Note: queries are string, body can be object because of bodyParsers;  
 * @deprecated: Unhandled Promise rejection
 */


/**
 * @default 127.0.0.1:27017 the local address of the server
 * @description the main connection to the server of the client
 */
const connection = (closure) => {

    return MongoClient.connect('mongodb://127.0.0.1:27017/up-goe-db', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });

};

// Initialization of the nodemailer transport (the 'sender' of the email).
/**
 * @default donevirdensinghynson@gmail.com - as the default email should add a system email to be used exclusive.
 * @description this function is used for retrieving lost password of a user.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'donevirdensinghynson@gmail.com',
        clientId: '252696106568-ra91i6p5akda1sv1lvbd0u9s0576nq05.apps.googleusercontent.com',
        clientSecret: 'fhz3ClKjFYWqqh3T4oEyTgZw',
        refreshToken: '1/Jqk1UIt4IVHkWIwB7hqMbNP-Zd_H2IaJjAqySmy0wOM'
    }
});

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



/**
 * @description portal for requests regarding courses. api/courses
 * @author Cedric Yao Alvaro
 */
router.get('/courses', (req, res) => {

    if (req.query.id) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('courses')
                .find(ObjectID(req.query.id))
                .toArray()
                .then((courses) => {
                    if (courses) {
                        response.data = courses[0];
                        res.json(courses[0]);
                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    } else {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('courses')
                .find()
                .toArray()
                .then((courses) => {
                    if (courses) {
                        response.data = courses;
                        res.json(courses);
                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }

});

/**
 * @description portal for requests on creating course plus section. api/createCourseSection
 * @author Sumandang, AJ Ruth
 */
router.post('/createCourseSection', (req, res) => {
    connection((db) => {
        var newCourseObj = {
            course_name: req.body.courseName,
            course_description: req.body.courseDescription
        };
        var newSectionObj = {
            course_id: "",
            section_name: req.body.sectionName,
            instructor: req.body.instructor,
            quests: req.body.quests,
            items: req.body.items,
            badges: req.body.badges,
            schedule: req.body.schedule
        };

        var isSuccess = false;
        var course;

        async.waterfall([
            insertCourse,
            insertSection,
            insertQuestMap
        ], function (err, results) {
            if (err) {
                response.message = err;
                throw err;
            }
            response.data = newSectionObj;
            res.json(results);
        });

        function insertCourse(callback) {
            const myDB = db.db('up-goe-db');
            myDB.collection('courses')
                .insertOne(newCourseObj, function (err, result) {
                    if (err) {
                        response.message = err;
                        throw err;
                    }
                    response.data = newCourseObj;
                    newSectionObj.course_id = result.insertedId + '';
                    callback(null, newSectionObj);
                });
        };

        function insertSection(sectionObj, callback) {
            const myDB = db.db('up-goe-db');
            myDB.collection('sections')
                .insertOne((sectionObj), function (err, result) {
                    if (err) {
                        response.message = err;
                        throw err;
                    }
                    resultId = result.insertedId + '';
                    response.data = result;
                    callback(null, resultId);
                });
        };

        function insertQuestMap(resultId, callback) {
            const myDB = db.db('up-goe-db');
            let newQuestMapObj = {
                section_id: resultId,
                max_exp: 0,
                quest_coordinates: [
                    {
                        quest_id: "",
                        type: "scatter",
                        x1: 5,
                        y1: 25
                    }
                ]
            };

            myDB.collection('questmaps')
                .insertOne((newQuestMapObj), function (err, result) {
                    if (err) {
                        response.message = err;
                        throw err;
                    }
                    response.data = result;
                    callback(null, result);
                });
        };
    });
});

router.post('/createQuest', (req, res) => {
    connection((db) => {
        var newQuestObj = {
            quest_title: req.body.quest_title,
            quest_description: req.body.quest_description,
            quest_retakable: req.body.quest_retakable,
            quest_badge: req.body.quest_badge,
            quest_xp: req.body.quest_xp,
            quest_hp: req.body.quest_hp,
            quest_item: req.body.quest_item,
            quest_start_date: req.body.quest_start_date,
            quest_end_date: req.body.quest_end_date,
            quest_party: req.body.quest_party
        };

        async.waterfall([
            insertQuest,
            addQuestToSection
        ], function (err, resultId) {
            if (err) {
                response.message = err;
                throw err;
            }

            let questObj = {
                _id: resultId,
                quest_title: req.body.quest_title,
                quest_description: req.body.quest_description,
                quest_retakable: req.body.quest_retakable,
                quest_badge: req.body.quest_badge,
                quest_xp: req.body.quest_xp,
                quest_hp: req.body.quest_hp,
                quest_item: req.body.quest_item,
                quest_start_date: req.body.quest_start_date,
                quest_end_date: req.body.quest_end_date,
                quest_party: req.body.quest_party
            }
            res.json(questObj);
        });

        function insertQuest(callback) {
            const myDB = db.db('up-goe-db');
            myDB.collection('quests')
                .insertOne(newQuestObj, function (err, result) {
                    if (err) {
                        response.message = err;
                        throw err;
                    }
                    response.data = newQuestObj;
                    callback(null, result.insertedId);
                });
        }

        function addQuestToSection(resultId, callback) {
            const myDB = db.db('up-goe-db');
            myDB.collection('sections')
                .update(
                    { _id: req.body.section_id },
                    {
                        $push: {
                            quests: {
                                quest_id: resultId,
                                quest_participants: [],
                                quest_prerequisite: []
                            }
                        }
                    },
                    function (err, section) {
                        response.data = section;
                        callback(null, resultId);
                    }
                );
        };
    });
});

router.post('/currentExperience', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('experiences')
            .findOne({
                user_id: req.body.user_id,
                section_id: req.body.section_id
            })
            .then(exp => {
                if (exp) {
                    exp.quests_taken.forEach(quest => {
                        if (quest.quest_id == req.body.quest_id) {
                            if (quest.is_graded) res.json("true");
                            else res.json("false");
                        }
                    });
                } else {
                    res.json(false);
                }
            })
            .catch(err => {
                sendError(err, res);
            });
    });
});

/**
 * @description portal for requests regarding experiences. api/users
 * @author Sumandang, AJ Ruth H.
 */
router.get('/experiences', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');

        let query = {
            section_id: req.query.section_id
        };

        if (req.query.user_id) {
            query = {
                section_id: req.query.section_id,
                user_id: req.query.user_id
            }
        }

        myDB.collection('experiences')
            .find(query)
            .toArray()
            .then(experiences => {
                res.json(experiences);
            })
            .catch(err => {
                sendError(err, res);
            })
    });
});

/**
 * @description portal for requests regarding experiences. api/experiences
 * @author AJ Ruth Sumandang
 */
router.post('/experiences', (req, res) => {
    var holder = "";
    var isEarning = false;
    if (req.body.method == "setStudentQuestGrade") {
        setStudentQuestGrade(req, res);
    } else if (req.body.user_id) {
        getUserExpRecord(req, res);
    }

    function getUserExpRecord(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('experiences')
                .findOne({
                    user_id: req.body.user_id,
                    section_id: req.body.section_id
                })
                .then(user => {
                    console.log('\n\nThis is your user');
                    console.log(user);
                    if (user) res.json(user);
                    else res.json(false);
                })
                .catch(err => {
                    sendError(err, res);
                });
        });
    }

    function setStudentQuestGrade(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('experiences')
                .updateOne(
                    {
                        user_id: req.body.user_id,
                        section_id: req.body.section_id
                    },
                    {
                        $set: {
                            "quests_taken.$[elem].quest_grade": req.body.grade,
                            "quests_taken.$[elem].is_graded": true
                        },
                        $push: {
                            total_xp: req.body.grade
                        }
                    },
                    {
                        arrayFilters: [{
                            "elem.quest_id": req.body.quest_id
                        }]
                    }
                )
                .then(grade => {

                    connection((db) => {
                        const myDB = db.db('up-goe-db');
                        myDB.collection('quests')
                            .find(ObjectID(req.body.quest_id))
                            .toArray()
                            .then((quests) => {
                                if(req.body.grade >= (quests[0].quest_xp * 0.8)){
                                    isEarning = true;
                                }
                                if (quests[0] && quests[0].quest_badge != "") {
                                    holder = quests[0].quest_badge;

                                    connection((db) => {
                                        const myDB = db.db('up-goe-db');
                                        myDB.collection('sections')
                                            .updateOne(
                                                {
                                                    _id: ObjectID(req.body.section_id)
                                                },
                                                {
                                                    $addToSet: {
                                                        "students.$[elem].badges": quests[0].quest_badge,

                                                    }
                                                },
                                                {
                                                    arrayFilters: [{ "elem.user_id": req.body.user_id }]
                                                }
                                            )
                                            .then(x => {
                                                holder = holder.toString().trim();
                                                if(isEarning){
                                                    connection((db) => {
                                                        const myDB = db.db('up-goe-db');
                                                        myDB.collection('badges')
                                                            .updateOne(
                                                                {
                                                                    _id: ObjectID(holder)
                                                                },
                                                                {
                                                                    $addToSet: {
                                                                        "badge_attainers": req.body.user_id,
                                                                    }
                                                                }
                                                            );
                                                    });
                                                }
                                                res.json(true);
                                            })
                                    });
                                } else {
                                    res.json(false);
                                }
                            })
                            .catch((err) => {
                                sendError(err, res);
                            });
                    });
                })
                .catch(err => {
                    sendError(err, res);
                })
        })
    }
});

router.post('/upload', (req, res) => {

    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        // return res.send(path.substring(8, path.length));
        return res.json({ originalName: req.file.originalname, uploadName: req.file.filename });
    })

});

router.get('/badgeImg', (req, res) => {
    var path = '';

    filepath = path.join(__dirname, '../../uploads') + '/' + req.query.imgName;
    res.sendFile(filepath);

});

router.post('/download', (req, res) => {
    filepath = path.join(__dirname, '../../uploads') + '/' + req.body.fileName;
    res.sendFile(filepath);
});



/**
 * @description portal for requests regarding users. api/login
 * @author Cedric Yao Alvaro
 * @author Donevir Hynson - modified Jan 11 2018
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
                if (user) {

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

/**
 * @description protal for requests regarding questmaps. api/questmaps
 * @author Sumandang. AJ Ruth H.
 */
router.get('/questmaps', (req, res) => {
    if (req.query.method && req.query.method == "getSectionQuestMap") {
        getSectionQuestMap(req, res);
    }

    function getSectionQuestMap(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('questmaps')
                .findOne({
                    section_id: req.query.section_id
                })
                .then((questmap) => {
                    res.json(questmap);
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }
});

/**
 * @description protal for requests regarding questmaps. api/questmaps
 * @author Sumandang. AJ Ruth H.
 */
router.post('/questmaps', (req, res) => {
    if (req.body.method && req.body.method == "addQuestMapCoordinates") {
        addQuestMapCoordinates(req, res);
    } else if (req.body.method && req.body.method == "editQuestMapCoordinateAt") {
        editQuestMapCoordinateAt(req, res);
    } else if (req.body.method && req.body.method == "setMaxEXP") {
        setMaxEXP(req, res);
    }

    function addQuestMapCoordinates(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('questmaps')
                .update(
                    { _id: ObjectID(req.body.quest_map_id) },
                    {
                        $push: {
                            quest_coordinates: {
                                $each: req.body.quest_coordinates
                            }
                        }
                    },
                    function (err, result) {
                        if (err) {
                            throw err;
                        }
                        req.body.quest_coordinates.forEach(coord => {
                            if (coord.quest_id) {
                                req.body.quest_coordinates = coord;
                            }
                        });
                        response.data = result;
                        addQuestToSection(req, res);
                    }
                );
        });
    }

    function editQuestMapCoordinateAt(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('questmaps')
                .updateOne(
                    {
                        _id: ObjectID(req.body.quest_map_id)
                    },
                    {
                        $set: {
                            "quest_coordinates.$[elem].quest_id": req.body.quest_coordinates.quest_id
                        }
                    },
                    {
                        upsert: true,
                        arrayFilters: [
                            {
                                $and: [
                                    { "elem.x1": req.body.quest_coordinates.x1 },
                                    { "elem.y1": req.body.quest_coordinates.y1 }
                                ]
                            }
                        ]
                    }
                )
                .then((questmaps) => {
                    response.data = questmaps;
                    addQuestToSection(req, res);
                })
                .catch(err => {
                    sendError(err, res);
                    throw err;
                });
        });

    };

    function addQuestToSection(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('sections')
                .update(
                    { _id: ObjectID(req.body.section_id) },
                    {
                        $push: {
                            quests: {
                                quest_id: req.body.quest_coordinates.quest_id,
                                quest_participants: [],
                                quest_prerequisite: []
                            }
                        }
                    }
                )
                .then(section => {
                    res.json(true);
                })
                .catch(err => {
                    sendError(err, res);
                });
        })
    };

    function setMaxEXP(req, res) {
        console.log("================set max exp====================");
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('questmaps')
                .updateOne(
                    { _id: ObjectID(req.body.quest_map_id) },
                    {
                        $set: {
                            max_exp: req.body.max_exp
                        }
                    }
                )
                .then(section => {
                    res.json(true);
                    console.log("================set max exp success====================");
                })
                .catch(err => {
                    sendError(err, res);
                });
        })
    }
});

/**
 * @description portal for requests regarding quests. api/quests
 * @author Cedric Yao Alvaro
 */
router.get('/quests', (req, res) => {
    if (req.query.quest_id) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('quests')
                .find(ObjectID(req.query.quest_id))
                .toArray()
                .then((quests) => {
                    if (quests) {
                        response.data = quests;
                        res.json(quests);
                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    } else {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('quests')
                .find()
                .toArray()
                .then((quests) => {
                    if (quests) {

                        response.data = quests;
                        res.json(quests);
                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }
});

/**
 * @description portal for requests regarding posts. api/posts
 * @author Cedric Yao Alvaro
 */
router.get('/posts', (req, res) => {
    var myObjArr = [];
    var counter = 0;
    var index = 0;

    if (req.query.method && req.query.method == "getSectionPosts") {
        getSectionPosts(req, res);
    } else {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            if (req.query.sections) {
                let sections = req.query.sections.split(",");
                myDB.collection('posts')
                    .find()
                    .toArray()
                    .then((posts) => {

                        if (posts) {

                            async.forEach(posts, processPosts, afterAll);

                            function processPosts(post, callback) {

                                myDB.collection('posts')
                                    .find({
                                        section_id: sections[counter]
                                    })
                                    .toArray()
                                    .then((post) => {
                                        Promise.all(post[0].section_id).then(() => {
                                            myObjArr.push(post[index]);
                                            counter++;
                                            index++;
                                        })
                                        callback(null);
                                    });

                            }

                            function afterAll(err) {
                                response.data = myObjArr;
                                res.json(myObjArr);
                            }

                        } else {
                            res.json(false);
                        }


                    })
                    .catch((err) => {
                        sendError(err, res);
                    })

            } else {
                res.json(false);
            }
        });

    }

    function getSectionPosts(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('posts')
                .find({
                    section_id: req.query.section_id
                })
                .toArray()
                .then((posts) => {
                    res.json(posts);
                })
                .catch(err => {
                    sendError(err, res);
                });
        });
    }
});

/**
 * @description portal for requests regarding posts. api/posts
 * @author Sumandang, AJ Ruth H.
 */
router.post('/posts', (req, res) => {
    if (req.body.method && req.body.method == "addCommentPost") {
        addCommentPost(req, res);
    } else if (req.body.method && req.body.method == "attachComment") {
        attachComment(req, res);
    }

    function addCommentPost(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            let newPostObj = {
                section_id: req.body.section_id,
                user_id: req.body.user_id,
                post_content: req.body.post_content,
                post_comments: req.body.post_comments,
                post_date: req.body.post_date,
                commentable: req.body.commentable,
                is_post: req.body.is_post,
                data: req.body.data
            };

            myDB.collection('posts')
                .insertOne(newPostObj, function (err, result) {
                    if (err) {
                        response.message = err;
                        throw err;
                    }
                    response.data = newPostObj;
                    res.json(result);
                });
        });
    }

    function attachComment(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            let newPostObj = {
                section_id: req.body.section_id,
                user_id: req.body.user_id,
                post_content: req.body.post_content,
                post_comments: req.body.post_comments,
                post_date: req.body.post_date,
                commentable: req.body.commentable,
                is_post: req.body.is_post
            };

            //inserting new commentpost into the DB
            myDB.collection('posts')
                .insertOne(newPostObj, function (err, result) {
                    if (err) {
                        response.message = err;
                        throw err;
                    }
                    let mainPostId = req.body.main_post_id;
                    let commentPostId = result.insertedId + '';

                    response.data = result;

                    myDB.collection('posts')
                        .updateOne(
                            { _id: ObjectID(mainPostId) },
                            {
                                $push: {
                                    post_comments: commentPostId
                                }
                            }
                        ).then(result => {

                            if (result) {
                                res.json(true);
                            } else {
                                res.json(false);
                            }

                        })
                        .catch((err) => {
                            sendError(err, res);
                        })
                });
        });
    }
});

/**
 * @description portal for post requests that regards to sections "api/sections"
 * @author Cedric Yao Alvaro
 * 
 * 1. Student requestin to enroll in a section
 */
router.post('/sections', (req, res) => {
    if (req.body.quest_id) {
        if (req.body.abandon) {
            abandonQuest(req, res);
        } else {
            if (req.body.method && req.body.method == "submitQuest") {
                //upload here
                submitQuest(req, res);
            } else {
                joinQuest(req, res);
            }
        }
    } else {
        enrollAndRequest(req, res);
    }


    function abandonQuest(req, res) {

        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('sections')
                .updateOne(
                    {
                        _id: ObjectID(req.body.section_id)
                    },
                    {
                        $pull: {
                            "quests.$[elem].quest_participants": req.body.user_id
                        }
                    },
                    {
                        arrayFilters: [{ "elem.quest_id": req.body.quest_id }]
                    }
                ).then(result => {
                    if (result) {

                        myDB.collection('experiences')
                            .updateOne(
                                {
                                    user_id: req.body.user_id,
                                    section_id: req.body.section_id
                                },
                                {
                                    $pull: {
                                        "quests_taken": {
                                            quest_id: req.body.quest_id
                                        }
                                    }
                                }
                            )
                            .then(x => {
                                res.json(x);
                            })

                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                })

        });

    }

    function submitQuest(req, res) {

        var submitObj = {
            quest_id: req.body.quest_id,
            quest_grade: 0,
            is_graded: false,
            file: req.body.data,
            comment: req.body.comment,
            date_submitted: new Date(req.body.time).toLocaleString()
        }


        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('experiences')
                .updateOne(
                    {
                        user_id: req.body.user_id,
                        "quests_taken.quest_id": req.body.quest_id
                    },
                    {
                        $set: {
                            "quests_taken.$[elem]": submitObj,
                        }
                    },
                    {
                        arrayFilters: [{ "elem.quest_id": req.body.quest_id }]
                    }
                )
                .then(x => {
                    res.json(x);
                })
                .catch((err) => {
                    sendError(err, res);
                })
        });

    }

    function joinQuest(req, res) {

        var myObj = {
            quest_id: req.body.quest_id,
            quest_grade: 0,
            is_graded: false,
            file: null,
            comment: "",
            date_submitted: ""
        }



        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('sections')
                .updateOne(
                    {
                        _id: ObjectID(req.body.section_id)
                    },
                    {
                        $addToSet: {
                            "quests.$[elem].quest_participants": req.body.user_id
                        }
                    },
                    {
                        arrayFilters: [{ "elem.quest_id": req.body.quest_id }]
                    }
                ).then(result => {
                    myDB.collection('experiences')
                        .updateOne(
                            {
                                user_id: req.body.user_id,
                                section_id: req.body.section_id
                            },
                            {
                                $addToSet: {
                                    "quests_taken": myObj
                                }
                            }
                        )
                        .then(x => {
                            res.json(x);
                        })



                })
                .catch((err) => {
                    sendError(err, res);
                })

        });

    }

    function enrollAndRequest(req, res) {

        if (!req.body.approve) {

            connection((db) => {
                const myDB = db.db('up-goe-db');

                myDB.collection('sections')
                    .updateOne(
                        { _id: ObjectID(req.body.section_id) },
                        {
                            $push: {
                                students: {
                                    user_id: req.body.user_id,
                                    status: "R",
                                    badges: []
                                }
                            }
                        }
                    ).then(result => {

                        if (result) {
                            res.json(result);
                        } else {
                            res.json(false);
                        }

                    })
                    .catch((err) => {
                        sendError(err, res);
                    })

            });

        } else if (req.body.approve) {

            connection((db) => {
                const myDB = db.db('up-goe-db');

                myDB.collection('sections')
                    .updateOne(
                        {
                            _id: ObjectID(req.body.section_id),
                            "students.user_id": req.body.user_id
                        },
                        {
                            $set: {
                                "students.$[elem].status": "E"
                            }
                        },
                        {
                            arrayFilters: [{ "elem.user_id": req.body.user_id }]
                        }
                    ).then(result => {

                        let newUserXP = {
                            user_id: req.body.user_id,
                            section_id: req.body.section_id,
                            total_xp: [],
                            quests_taken: []
                        }

                        myDB.collection('experiences')
                            .insertOne(newUserXP, function (err, result) {
                                if (err) {
                                    response.message = err;
                                    throw err;
                                }
                                response.data = newUserXP;
                                res.json(result);
                            })

                    })
                    .catch((err) => {
                        sendError(err, res);
                    })

            });

        }

    }



})


/**
 * @description portal for get requests that regards to sections "api/sections"
 * @author Cedric Yao Alvaro
 */
router.get('/sections', (req, res) => {
    var myObjArr = [];

    if (req.query.instructor) {
        getSectionsofInstructor(req, res);
    } else if (req.query.id) {
        getSectionsOfStudent(req, res);
    } else if (req.query.class) {

        if (req.query.class.length == 24) {
            searchSection(req, res);
        } else {
            searchSectionByName(req, res);
        }

    } else if (req.query.students) {
        getEnrolledStudents(req, res);
    }

    function getEnrolledStudents(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('sections')
                .findOne(ObjectID(req.query.students))
                .then((sections) => {

                    if (sections) {
                        if (sections.students) {
                            let enrolled = sections.students.map((x) => {
                                if (x.status == 'E' || req.query.all) {
                                    return x.user_id;
                                } else {
                                    return "";
                                }
                            })
                            response.data = enrolled;
                            res.send(enrolled);
                        } else {
                            res.json(false);
                        }

                    } else {
                        res.json(false);
                    }

                })
                .catch((err) => {
                    sendError(err, res);
                })
        });
    }

    function getSectionsofInstructor(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('sections')
                .find({
                    instructor: req.query.instructor
                })
                .toArray()
                // editing the section body adding a course name in it.
                .then((sections) => {

                    if (sections) {

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

                    } else {
                        res.json(false);
                    }


                })
                .catch((err) => {
                    sendError(err, res);
                })

        });
    }

    function getSectionsOfStudent(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');

            let query = {
                students: {
                    $elemMatch: {
                        user_id: req.query.id
                    }
                }
            };

            if (req.query.section_id) {
                query = {
                    _id: ObjectID(req.query.section_id),
                    students: {
                        $elemMatch: {
                            user_id: req.query.id
                        }
                    }
                }
            }

            myDB.collection('sections')
                .find(query)
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
    }

    function searchSection(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('sections')
                .find(ObjectID(req.query.class))
                .toArray()
                .then((sections) => {

                    if (sections) {

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

                    } else {

                        res.json(false);
                    }

                })
                .catch((err) => {
                    sendError(err, res);
                })

        });
    }

    function searchSectionByName(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('sections')
                .find()
                .toArray()
                .then((sections) => {
                    if (sections) {

                        myDB.collection('courses')
                            .find({
                                course_name: { $regex: '(?i)' + req.query.class + '(?-i)' }
                            })
                            .toArray()
                            .then((course) => {

                                // course found.
                                if (course.length > 0) {

                                    sections.filter((s) => {
                                        course.filter((c) => {
                                            if (c._id == s.course_id) {
                                                myObjArr.push({
                                                    section: s,
                                                    course_name: c.course_name
                                                });
                                            }
                                        })
                                    });

                                    Promise.all(myObjArr).then(x => {
                                        res.json(myObjArr);
                                    })
                                }




                            });

                    } else {
                        res.json(false);
                    }



                })
                .catch((err) => {
                    sendError(err, res);
                })



        });
    }


});

router.get('/getSectionQuests', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');

        myDB.collection('questmaps')
            .findOne({
                "section_id": req.query.section_id
            })
            .then(questmap => {
                if(questmap) {
                    let questIds = [];
                    questmap.quest_coordinates.forEach(coord => {
                        if (coord.quest_id) {
                            questIds.push(coord.quest_id);
                        }
                    });

                    myDB.collection('quests')
                        .find()
                        .toArray()
                        .then((quests) => {
                            let sectionQuests = [];
                            questIds.forEach(questId => {
                                quests.forEach(quest => {
                                    if (quest._id == questId) {
                                        sectionQuests.push(quest);
                                    }
                                });
                            })
                            res.json(sectionQuests);
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });
                } else res.json(false);
            })
            .catch((err) => {
                sendError(err, res);
            });
    })
});



/**
 * @description portal for requests regarding quests. api/sectionQuests
 * @author Cedric Yao Alvaro
 * @author Donevir Hynson - modified 2 June 2018
 */
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
                            quest.quest_participants.forEach(participant => {
                                if (participant == req.query.id) {
                                    userQuests.push(quest.quest_id);
                                }
                            });
                        })
                    });

                    // Removing duplicate entries in userQuests.
                    userQuests = userQuests.filter(function (elem, pos) {
                        return userQuests.indexOf(elem) == pos;
                    });

                    myDB.collection('quests')
                        .find()
                        .toArray()
                        .then((quests) => {
                            let AllUserQuests = [];
                            sections.forEach(section => {
                                section.quests.forEach(quest => {
                                    userQuests.forEach(userQuest => {
                                        if (quest.quest_id == userQuest) {
                                            console.log(section._id);
                                            console.log("--------------");
                                            AllUserQuests.push({
                                                course: section.course_id,
                                                section: section.section_name,
                                                section_id: section._id,
                                                questData: quest.quest_id
                                            });
                                        }
                                    })
                                })
                            });

                            // Replaces the questId in AllUserQuests.questData to quest object.
                            quests.forEach(quest => {
                                AllUserQuests.forEach(userQuest => {
                                    if (quest._id == userQuest.questData) {
                                        userQuest.questData = quest;
                                    }
                                });
                            });

                            myDB.collection('courses')
                                .find()
                                .toArray()
                                .then((courses) => {
                                    if (courses) {
                                        // Replaces the course_id in AllUserQuests.course to course_name.
                                        AllUserQuests.forEach(quest => {
                                            courses.forEach(course => {
                                                if (course._id == quest.course) {
                                                    quest.course = course.course_name;
                                                }
                                            });
                                        });

                                        let user_section_ids = [];
                                            user_section_ids = AllUserQuests.map(quest => {
                                                return quest.section_id + ""
                                            });

                                            myDB.collection('experiences').find({
                                                user_id: 
                                                req.query.id,
                                                section_id: {$in: user_section_ids}
                                            }).toArray()
                                                .then(expArr => {
                                                    expArr.forEach(exp => 
                                                        {
                                                        exp.quests_taken = exp.quests_taken.filter(q => {
                                                            if (q.date_submitted != '') 
                                                            {
                                                                return q.quest_id;
                                                            }
                                                        }
                                                    );

                                                    AllUserQuests = AllUserQuests.filter(
                                                            uq => {
                                                            let isIncluded = true;
                                                            exp.quests_taken.forEach(id => {
                                                                if (id.quest_id == (uq.questData._id + '')) {
                                                                    isIncluded = false;
                                                                }
                                                            })

                                                            if (isIncluded) {
                                                                return uq;
                                                            }
                                                        }
                                                    )


                                                    console.log("final quests");
                                                    console.log(AllUserQuests);
                                                })
                                                let auq = AllUserQuests;
                                                response.data = auq;
                                                res.json(auq);

                                            }
                                            )
                                            .catch((err) => {
                                                sendError(err, res);
                                            });
                                    } else {
                                        response.data = courses;
                                        res.json(false);
                                    }
                                })
                                .catch((err) => {
                                    sendError(err, res);
                                });
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });
                } else {
                    response.data = sections;
                    res.json(sections);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/**
 * @description portal for requests regarding signup. api/signup
 * @author Donevir Hynson
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
            user_photo: null,
            user_security_question: req.body.securityQuestion,
            user_security_answer: req.body.securityAnswer,
            user_conditions: req.body.userConditions
        };

        myDB.collection('users')
            // Counts the number of returned results from query
            .count({
                user_email: newUserObj.user_email
            })
            .then((count) => {
                // If count returns true (>=1), then user email already exists
                if (count) {
                    response.data = newUserObj.user_email;
                    // Returns false to signal that user already exists
                    res.json(false);
                } else {
                    // If count returns false (=0), inserts new user to database
                    myDB.collection('users')
                        .insertOne(newUserObj, function (err, result) {
                            if (err) {
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

/**
 * @description portal for requests regarding users. api/users
 * @author Cedric Yao Alvaro
 */
router.get('/users', (req, res) => {

    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .find(
                ObjectID(req.query.id)
            )
            .toArray()
            .then((users) => {
                if (users) {
                    response.data = users;
                    res.json(users);
                } else {
                    res.json(false);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

});

router.post('/updateUser', (req, res) => {
    var x = new Date(Date.now());
    var h = [];

    if (req.body.currentUserId && req.body.userContactNo) {
        updateStudentProfile(req, res);
    } else {
        hasLoggedInThisDay(req, res);
    }


    function loginUpdate(req, res) {

        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('users')
                .updateOne(
                    { _id: ObjectID(req.body.user_id) },
                    {
                        $inc: {
                            "user_conditions.log_in_streak": 1
                        },
                        $push: {
                            "user_conditions.log_in_total": new Date(x).toLocaleDateString()
                        }
                    }

                )
                .then(z => {
                    if (z) {
                        res.json(true);
                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });

    }

    function updateStudentProfile(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('users')
                .updateOne(
                    { _id: ObjectID(req.body.currentUserId) },
                    {
                        $set: {
                            user_contact_no: req.body.userContactNo
                        }
                    },
                    function (err, res) {
                        if (err) throw err;
                        response.data = req.body.currentUserId;
                    }
                );
        });
    }


    function hasLoggedInThisDay(req, res) {

        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('users')
                .findOne(ObjectID(req.body.user_id))
                .then((user) => {

                    if (user) {

                        if (user.user_conditions.log_in_total.length > 0) {

                            Promise.all(user.user_conditions.log_in_total).then((date) => {

                                h = date.filter((d) => {
                                    if (new Date(d).toLocaleDateString() == x.toLocaleDateString()) {
                                        return new Date(d).toLocaleDateString();
                                    } else {
                                        return false;
                                    }
                                });
                                if (h.length > 0) {
                                    res.json(true);
                                } else {
                                    loginUpdate(req, res);
                                }

                            });

                        } else {

                            loginUpdate(req, res);

                        }

                    } else {
                        res.json(false);
                    }



                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }



});

/**
 * @description portal for requests regarding Badges. api/badges
 * @author Cedric Yao Alvaro
 * @author Donevir Hynson - modified 6 June 2018
 */
router.post('/badges', (req, res) => {
    if (req.body.badgeData) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('badges')
                .count({ badge_name: req.body.badgeData.badge_name })
                .then((count) => {
                    if (count > 0) {
                        response.data = req.body.badgeData.badge_name;
                        res.json(false);
                    } else {
                        myDB.collection('badges')
                            .insertOne((req.body.badgeData), function (err, res) {
                                if (err) {
                                    throw err;
                                } else {
                                    myDB.collection('badges')
                                        .findOne({ badge_name: req.body.badgeData.badge_name })
                                        .then(badge => {
                                            if (badge) {
                                                myDB.collection('sections')
                                                    .updateOne({ _id: ObjectID(req.body.sectionId) }, {
                                                        $push: {
                                                            badges: JSON.stringify(badge._id).toString().substring(1, 25)
                                                        }
                                                    })
                                            }
                                        })
                                        .catch(err => {
                                            sendError(err, res);
                                        });
                                }
                            });
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
        res.json(true);
    } else {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('badges')
                .find()
                .toArray()
                .then((badges) => {

                    if (badges) {
                        Promise.all(badges).then((badge) => {
                            let earnedbadge = badge.filter((b) => {
                                if (b.badge_conditions.log_in_streak <= req.body.conditions.log_in_streak) {
                                    return b;
                                }
                            });

                            if (earnedbadge.length > 0) {
                                Promise.all(earnedbadge).then((eb) => {
                                    connection((db) => {
                                        const myDB = db.db('up-goe-db');
                                        myDB.collection('badges')
                                            .updateOne(
                                                { _id: ObjectID(eb[0]._id) },
                                                {
                                                    $addToSet: {
                                                        "badge_attainers": req.body.user_id
                                                    }
                                                }
                                            )
                                            .then(badge => {
                                                res.json(badge);
                                            })
                                            .catch((err) => {
                                                sendError(err, res);
                                            });
                                    });
                                });
                            } else {
                                res.json(false);
                            }
                        });
                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }
});

router.get('/badges', (req, res) => {
    if (req.query.method == "ALL") {

        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('badges')
                .find()
                .toArray()
                .then((badges) => {
                    if (badges) {
                        res.json(badges);
                    } else {
                        res.json(false);
                    }
                })
        });

    } else if (req.query.badge_id) {

        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('badges')
                .find({ _id: ObjectID(req.query.badge_id) })
                .toArray()
                .then((badges) => {
                    if (badges && badges[0]) {
                        res.json(badges[0]);
                    } else {
                        res.json(false);
                    }
                })
        });

    } else if (req.query.method && req.query.method == "getSectionBadges") {
        getSectionBadges(req, res);
    } else {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('badges')
                .find()
                .toArray()
                .then((badges) => {

                    if (badges) {

                        Promise.all(badges).then(badges => {
                            // earned system badges
                            let esb = badges.filter(b => {
                                if (b.is_system_badge == true) {
                                    let a = b.badge_attainers.filter(user => {
                                        if (user == req.query.id) {
                                            return user;
                                        }
                                    });
                                    if (a.length > 0) {
                                        return b;
                                    };
                                }
                            });
                            response.data = esb;
                            res.json(esb);
                        });

                    } else {
                        res.json(false);
                    }
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    }

    function getSectionBadges(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');

            myDB.collection('sections')
                .findOne(ObjectID(req.query.section_id))
                .then(section => {
                    let sectionBadges = [];
                    section.badges.forEach(badge => {
                        sectionBadges.push(ObjectID(badge));
                    })

                    myDB.collection('badges')
                        .find({
                            _id: {
                                $in: sectionBadges
                            }
                        })
                        .toArray()
                        .then((badges) => {

                            res.json(badges);
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });
                })
                .catch((err) => {
                    sendError(err, res);
                });
        })
    }
});

/**
 * @description portal for requests regarding security questions. api/securityQuestions
 * @author Donevir D. Hynson
 * @author Cedric Yao Alvaro - modified May 14, 2018
 */
router.get('/securityQuestions', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('questions')
            .find()
            .toArray()
            .then((questions) => {
                if (questions) {
                    response.data = questions;
                    res.json(questions);
                } else {
                    res.json(false);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/**
 * @description portal for requests regarding user requesting for their forgotten password. api/userReqPass
 * @author Donevir D. Hynson
 */
router.post('/userReqPass', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('users')
            .findOne({
                user_email: req.body.user_email
            })
            .then((user) => {
                if (user) {
                    // Mail content that is to be sent.
                    var mailOptions = {
                        from: 'UPGOE Admin <donevirdensinghynson@gmail.com>',
                        to: user.user_email,
                        subject: 'Password Retrieval',
                        text: 'Hi ' + user.user_fname + '. Your password is \'' + user.user_password + '\'.' +
                                '\n\nThis is a system-generated email.\nDo not reply in this email.\nThank you.'
                    };

                    // Sends the email.
                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            throw (err);
                        }
                    });
                    response.data = user.user_email;
                    res.json(user.user_email);
                } else {
                    response.data = user;
                    res.json(false);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/**
 * @description portal for requests to collect score data from a certain quest. api/questLeaderboard
 * @author Donevir D. Hynson
 */
router.post('/questLeaderboard', (req, res) => {
    connection((db) => {
        const myDB = db.db('up-goe-db');
        myDB.collection('experiences')
            .find({
                section_id: req.body.currSection,
                quests_taken: {
                    $elemMatch: {
                        is_graded: true
                    }
                }
            })
            .toArray()
            .then((experiences) => {
                if (experiences) {
                    var studentExp = [];

                    // Acquires the students with scores in the database.
                    experiences.forEach((exp) => {
                        exp.quests_taken.forEach((quest) => {
                            if (quest.quest_id == req.body.currQuest) {
                                studentExp.push({
                                    studentId: exp.user_id,
                                    score: quest.quest_grade,
                                    dateCompleted: quest.date_submitted
                                });
                            }
                        });
                    });

                    // Sorts the result in increasing order.
                    studentExp.sort(function (a, b) {
                        return (b.score - a.score);
                    });

                    // Replaces the _id to userId.
                    myDB.collection('users')
                        .find()
                        .toArray()
                        .then((users) => {
                            if (users) {
                                users.forEach(user => {
                                    studentExp.forEach(exp => {
                                        if (user._id == exp.studentId) {
                                            exp.studentId = user.user_school_id;
                                        }
                                    });
                                });
                                response.data = studentExp;
                                res.json(studentExp);
                            } else {
                                response.data = users;
                                res.json(false);
                            }
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });
                } else {
                    response.data = experiences;
                    res.json(false);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;