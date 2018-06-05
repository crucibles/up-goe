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
const xoauth2 = require('xoauth2');
const cookie = require('ng2-cookies');

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
        refreshToken: '1/t3ZXrgNJSymigHcL2Wc3qwnTK7cgyskwfVWKy4_9eV0'
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


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

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
                        console.log(courses);
                        response.data = courses[0];
                        res.json(courses[0]);
                    } else {
                        res.json([]);
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
                        res.json([]);
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
    console.log("__________start new 2_____________________");
    console.log("success enter");
    connection((db) => {
        console.log("success2 enter");
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
        console.log("before db coll");

        var isSuccess = false;
        var course;

        async.waterfall([
            insertCourse,
            insertSection,
            insertQuestMap
        ], function (err, results) {
            console.log(">>>enter last callback,<<<<");
            if (err) {
                console.log(err);
                response.message = err;
                throw err;
            }
            console.log(results);
            response.data = newSectionObj;
            res.json(results);
            console.log("END OF COURSES");
            console.log("_______________end________________");
        });

        function insertCourse(callback) {
            const myDB = db.db('up-goe-db');
            console.log("=======insercourse======");
            console.log(newCourseObj.course_name);
            myDB.collection('courses')
                .insertOne(newCourseObj, function (err, result) {
                    if (err) {
                        console.log(err);
                        response.message = err;
                        throw err;
                    }
                    response.data = newCourseObj;
                    console.log("------------------------");
                    console.log(result.insertedId);
                    console.log("------------------------");
                    newSectionObj.course_id = result.insertedId + '';
                    console.log(newSectionObj);
                    console.log("------------------------");
                    callback(null, newSectionObj);
                });
        };

        function insertSection(sectionObj, callback) {
            const myDB = db.db('up-goe-db');
            console.log("<<insert section");
            console.log(sectionObj);
            console.log(">>/////");
            myDB.collection('sections')
                .insertOne((sectionObj), function (err, result) {
                    console.log("inserted!");
                    if (err) {
                        console.log("error inserted!");
                        console.log(err);
                        response.message = err;
                        throw err;
                    }
                    console.log("end insert sec");
                    console.log(result);
                    resultId = result.insertedId + '';
                    response.data = result;
                    callback(null, resultId);
                    console.log("end insert sec");
                });
        };

        function insertQuestMap(resultId, callback) {
            const myDB = db.db('up-goe-db');
            console.log("<<insert questmap");
            console.log(resultId);
            console.log(">>/////");
            let newQuestMapObj = {
                section_id: resultId,
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
                    console.log("inserted!");
                    if (err) {
                        console.log("error inserted!");
                        console.log(err);
                        response.message = err;
                        throw err;
                    }
                    console.log("end insert sec");
                    response.data = result;
                    callback(null, result);
                    console.log("end insert sec");
                });
        };
    });
});

router.post('/createQuest', (req, res) => {
    console.log("_______________CREATING QUEST__________")
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
            console.log(">>>enter last callback,<<<<");
            if (err) {
                console.log("entered err");
                console.log(err);
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
            console.log(questObj);
            res.json(questObj);
        });

        function insertQuest(callback) {
            const myDB = db.db('up-goe-db');
            myDB.collection('quests')
                .insertOne(newQuestObj, function (err, result) {
                    if (err) {
                        console.log(err);
                        response.message = err;
                        throw err;
                    }
                    response.data = newQuestObj;
                    console.log("------------------------");
                    console.log(result.insertedId);
                    console.log("------------------------");
                    callback(null, result.insertedId);
                });
        }

        function addQuestToSection(resultId, callback) {
            const myDB = db.db('up-goe-db');
            console.log("rebodysecid: " + req.body.section_id);
            console.log("rebodyresid: " + resultId);
            myDB.collection('section')
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
                        console.log("ENTER section callback");
                        response.data = section;
                        callback(null, resultId);
                    }
                );
        };
    });
});

/**
 * @description portal for requests regarding experiences. api/users
 * @author Sumandang, AJ Ruth H.
 */
router.get('/experiences', (req, res) => {
    console.log("-----------GET EXP--------------")
    connection((db) => {
        const myDB = db.db('up-goe-db');
        console.log("req.params");
        console.log(req.query);

        let query = {
            section_id: req.query.section_id
        };

        if (req.query.user_id) {
            query = {
                section_id: req.query.section_id,
                user_id: req.query.user_id
            }
        }
        console.log(query);
        console.log("query");

        myDB.collection('experiences')
            .find(query)
            .toArray()
            .then(experiences => {
                console.log("<experiences>");
                console.log(experiences);
                res.json(experiences);
            })
            .catch(err => {
                console.log('err')
                console.log(err)
                sendError(err, res);
            })
    });
});

/**
 * @description portal for requests regarding experiences. api/experiences
 * @author AJ Ruth Sumandang
 */
router.post('/experiences', (req, res) => {
    if (req.body.method == "setStudentQuestGrade") {
        console.log("beforesetenter")
        setStudentQuestGrade(req, res);
    }

    function setStudentQuestGrade(req, res) {
        console.log("-------entered setgrade------------");
        console.log(req.body);
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
                            "quests_taken.$[elem].quest_grade":  req.body.grade,
                            "quests_taken.$[elem].is_graded": true  
                        }
                    },
                    {
                        arrayFilters: [{
                            "elem.quest_id": req.body.quest_id
                        }]
                    }
                )
                .then(grade => {
                    console.log("grade");
                    console.log(grade);
                    res.json(true);
                })
                .catch(err => {
                    console.log("ERROR");
                    sendError(err, res);
                })
        })
    }
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

                    res.json([]);
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
    console.log("getter quest maps");
    if (req.query.method && req.query.method == "getSectionQuestMap") {
        getSectionQuestMap(req, res);
    }

    function getSectionQuestMap(req, res) {
        console.log("getSectionQuestMap");
        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('questmaps')
                .findOne({
                    section_id: req.query.section_id
                })
                .then((questmap) => {
                    console.log("---------");
                    console.log(questmap);
                    console.log("---------");
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
    console.log("quest maps");
    console.log(req.body.method);
    if (req.body.method && req.body.method == "addQuestMapCoordinates") {
        console.log("ADDQuestMapCoordinates");
        addQuestMapCoordinates(req, res);
    } else if (req.body.method && req.body.method == "editQuestMapCoordinateAt") {
        console.log("EDITQuestMapCoordinates");
        editQuestMapCoordinateAt(req, res);
    }

    function addQuestMapCoordinates(req, res) {
        console.log("----enterADD-----");
        console.log("addQuestMapCoordinates");
        console.log(req.body);
        console.log(req.body.quest_map_id);
        console.log(req.body.quest_coordinates);
        connection((db) => {
            const myDB = db.db('up-goe-db');
            console.log(req.body.quest_map_id);
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
                        console.log("try add qmp");
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        console.log("-----");
                        console.log(result);
                        console.log("-----");
                        console.log("success");
                        response.data = result;
                        addQuestToSection(req, res);
                    }
                );
        });
    }

    function editQuestMapCoordinateAt(req, res) {
        console.log("----enterEDIT-----");
        console.log("addQuestMapCoordinates");
        console.log(req.body);
        console.log(req.body.quest_map_id);
        console.log(req.body.quesquest_id);
        console.log(req.body.quest_coordinates);
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
                    console.log("===entered questmap pdate edit ====");
                    console.log(questmaps);
                    response.data = questmaps;
                    console.log("===entered questmap pdate edit ====");
                    addQuestToSection(req, res);
                })
                .catch(err => {
                    console.log("err");
                    console.log(err);
                    sendError(err, res);
                    res.json(false);
                    throw err;
                });
        });

    };

    function addQuestToSection(req, res) {
        connection((db) => {
            const myDB = db.db('up-goe-db');
            console.log("rebodysecid: " + req.body.section_id);
            console.log("rebodyresid: " + req.body.quest_coordinates.quest_id);
            myDB.collection('section')
                .update(
                    { _id: req.body.section_id },
                    {
                        $push: {
                            quests: {
                                quest_id: req.body.quest_coordinates.quest_id,
                                quest_participants: [],
                                quest_prerequisite: []
                            }
                        }
                    },
                    function (err, section) {
                        console.log("ENTER add Quest to Section of QUESTMAP callback");
                        response.data = section;
                        res.json(req.body.quest_coordinates);
                    }
                );
        })
    };
});

/**
 * @description portal for requests regarding quests. api/quests
 * @author Cedric Yao Alvaro
 */
router.get('/quests', (req, res) => {
    console.log("quuesssst");
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
                        res.json([]);
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
                        res.json([]);
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
    console.log(req.method);
    var myObjArr = [];
    var counter = 0;
    var index = 0;

    connection((db) => {
        const myDB = db.db('up-goe-db');

        if (req.query.sections) {
            let sections = req.query.sections.split(",");
            console.log(sections);
            myDB.collection('posts')
                .find()
                .toArray()
                .then((posts) => {

                    if (posts) {

                        forEach(posts, processPosts, afterAll);

                        function processPosts(post, callback) {

                            myDB.collection('posts')
                                .find({
                                    section_id: sections[counter]
                                })
                                .toArray()
                                .then((post) => {
                                    console.log(post.length);
                                    Promise.all(post[0].section_id).then(() => {
                                        myObjArr.push(post[index]);
                                        counter++;
                                        index++;
                                    })
                                    callback(null);
                                });

                        }

                        function afterAll(err) {
                            console.log(myObjArr);
                            response.data = myObjArr;
                            res.json(myObjArr);
                        }

                    } else {
                        res.json([]);
                    }


                })
                .catch((err) => {
                    sendError(err, res);
                })

        } else {
            myDB.collection('posts')
                .find()
                .toArray()
                .then((x) => {

                    if (x) {
                        res.json(x);
                    } else {
                        res.json([]);
                    }

                })
        }




    });

});

/**
 * @description portal for post requests that regards to sections "api/sections"
 * @author Cedric Yao Alvaro
 * 
 * 1. Student requestin to enroll in a section
 */
router.post('/sections', (req, res) => {

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
                                status: "R"
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

    }

})


/**
 * @description portal for get requests that regards to sections "api/sections"
 * @author Cedric Yao Alvaro
 */
router.get('/sections', (req, res) => {
    var myObjArr = [];

    if (req.query.instructor) {
        console.log("enter search for section1");
        getSectionsofInstructor(req, res);
    }

    if (req.query.id) {
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
                        res.json([]);
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
            console.log("---------------------");
            console.log(req.query.instructor);
            console.log("---------------------");
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
                        res.json([]);
                    }


                })
                .catch((err) => {
                    sendError(err, res);
                })

        });
    }

    function getSectionsOfStudent(req, res) {
        console.log("enter search for section" + req.query);
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
                    async.forEach(sections, processEachSection, afterAllSection);

                    function processEachSection(section, callback) {
                        console.log(section);
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
                                console.log(course);
                                // course found.
                                if (course.length > 0) {

                                    sections.forEach(section => {

                                        if (section.course_id == course[0]._id) {

                                            myObjArr.push({
                                                section: section,
                                                course_name: course[0].course_name
                                            });

                                        }

                                    })


                                }

                                Promise.all(myObjArr).then(x => {
                                    res.json(myObjArr);
                                })



                            });

                    } else {
                        res.json([]);
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

        console.log("----------getSectionQuests----------");
        console.log(req.query.section_id);
        console.log("----");
        myDB.collection('questmaps')
            .findOne({
                "section_id": req.query.section_id
            })
            .then(questmap => {
                console.log("questmap");
                console.log(questmap);
                let questIds = [];
                questmap.quest_coordinates.forEach(coord => {
                    if (coord.quest_id) {
                        questIds.push(coord.quest_id);
                    }
                });

                console.log("questIds");
                console.log(questIds);
                myDB.collection('quests')
                    .find()
                    .toArray()
                    .then((quests) => {
                        console.log("quests after locating questmap");
                        let sectionQuests = [];
                        console.log(quests);
                        console.log("comparing.....");
                        questIds.forEach(questId => {
                            console.log("compare ID");
                            console.log(questId);
                            quests.forEach(quest => {
                                console.log(questId);
                                console.log(quest._id);
                                if (quest._id == questId) {
                                    console.log(quest);
                                    sectionQuests.push(quest);
                                }
                            });
                        })
                        console.log(sectionQuests);
                        res.json(sectionQuests);
                    })
                    .catch((err) => {
                        sendError(err, res);
                    });
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
                            if (quest.quest_participants == req.query.id) {
                                userQuests.push(quest.quest_id);
                            }
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
                                            AllUserQuests.push({
                                                course: section.course_id,
                                                section: section.section_name,
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

                                        response.data = AllUserQuests;
                                        res.json(AllUserQuests);
                                    } else {
                                        console.log('There are no courses found');
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
            user_security_answer: req.body.securityAnswer
        };

        myDB.collection('users')
            // Counts the number of returned results from query
            .count({
                user_email: newUserObj.user_email
            })
            .then((count) => {
                // If count returns true (>=1), then user email already exists
                if (count) {
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

                                h = date.map((d) => {
                                    console.log(new Date(d).toLocaleDateString());
                                    console.log(x.toLocaleDateString());
                                    if (new Date(d).toLocaleDateString().trim() == x.toLocaleDateString().trim()) {
                                        return new Date(d).toLocaleDateString();
                                    } else {
                                        return false;
                                    }
                                });
                                console.log(h);
                                if (h.length > 0) {
                                    console.log("Already logged in this day");
                                    res.json(true);
                                } else {
                                    console.log("not yet logged in");
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
 */
router.post('/badges', (req, res) => {
    console.log("METHOD!!!!!!!!!!!!!!!!!");
    console.log(req.method);

    if (req.method == "POST") {

        connection((db) => {
            const myDB = db.db('up-goe-db');
            myDB.collection('badges')
                .find()
                .toArray()
                .then((badges) => {

                    if (badges) {

                        Promise.all(badges).then((badge) => {
                            console.log(req.body);
                            console.log("===================");
                            console.log(badge);

                            let earnedbadge = badge.filter((b) => {
                                console.log("STreaks");
                                console.log(b.badge_conditions.log_in_streak);
                                console.log(req.body.conditions.log_in_streak);
                                if (b.badge_conditions.log_in_streak <= req.body.conditions.log_in_streak) {
                                    return b;
                                }

                            });

                            if (earnedbadge.length > 0) {

                                Promise.all(earnedbadge).then((eb) => {
                                    console.log(eb[0]._id);
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
                                                console.log("badge updated");
                                                res.json(badge);
                                            })
                                            .catch((err) => {
                                                sendError(err, res);
                                            });
                                    });

                                });

                            } else {

                                res.json([]);

                            }



                        });

                    } else {
                        res.json([]);
                    }



                })
                .catch((err) => {
                    sendError(err, res);
                });
        });

    }





});

router.get('/badges', (req, res) => {
    console.log("IM IN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

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
                            console.log(b);
                            if (b.is_system_badge == true) {
                                let a = b.badge_attainers.filter(user => {
                                    console.log(user);
                                    if (user == req.query.id) {
                                        return user;
                                    }
                                });
                                console.log(a);
                                if (a.length > 0) {
                                    return b;
                                };
                            }
                        });
                        console.log(esb);
                        response.data = esb;
                        res.json(esb);
                    });

                } else {
                    res.json([]);
                }

            })
            .catch((err) => {
                sendError(err, res);
            });
    });


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
                    res.json([]);
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
                        text: 'Hi ' + user.user_fname + '. Your password is \'' + user.user_password + '\'.'
                    };

                    // Sends the email.
                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Email sent');
                        }
                    });
                    response.data = user.user_email;
                    res.json(user.user_email);
                } else {
                    console.log("User is not found");
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
            .find({ section_id: req.body.currSection })
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
                                    dateCompleted: quest.quest_date_completed
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
                                console.log('There are no users in the database');
                                response.data = users;
                                res.json(false);
                            }
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });
                } else {
                    console.log('There are no XP records in the database');
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
